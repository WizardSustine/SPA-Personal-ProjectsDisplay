import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunnelPathService } from '../services/funnel-path.service';
import { Funnel } from '../models/funnel.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'graphics',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="admin">
    <h2>GRÁFICAS DEL RECORRIDO DE LOS VISITANTES</h2>
        @if(chartData){
    <div class="chart-container">
      <select id="selector" name="selector" (change)="onSelectionChange($event)">
        <option value="count" selected>Cantidad de visitantes</option>
        <option value="percentage">Clicks promedio</option>
        <option value="total">Clicks totales</option>
      </select>
      <svg viewBox="0 0 350 200">
        <line x1="40" y1="10" x2="40" y2="170" stroke="#333" stroke-width="2" />
        <g *ngFor="let tick of [0, 0.5, 1]; let i = index">
          <text x="35" [attr.y]="170 - (i * 80)" text-anchor="end" font-size="8" fill="#666">
            {{ mathRound(maxCount * i * 0.5) }}
          </text>
        </g>
        <g>
          <text
            [attr.x]="-160"
            [attr.y]="10"
            [attr.transform]="'rotate(-90) '"
            text-anchor="start"
            font-size="15">
              {{labelY}}
          </text>
        </g>

        <line x1="40" y1="170" x2="310" y2="170" stroke="#333" stroke-width="2" />
          <g>
            <text
              [attr.x]="190"
              [attr.y]="205"
              text-anchor="middle"
              font-size="15">
                {{labelX}}
            </text>
          </g>

        <g *ngFor="let bar of chartData; let i = index">
          <rect
            [attr.x]="OFFSET_X + (i * barWidth()) + (barWidth() * 0.1)" 
            [attr.y]="170 - (bar.count * (150 / maxCount))"
            [attr.width]="barWidth() * 0.85" 
            [attr.height]="bar.count * (150 / maxCount)"
            fill="#0910e2"
          ></rect>

          <text
            [attr.x]="OFFSET_X + (i * barWidth()) + (barWidth() / 2)"
            y="185"
            [attr.font-size]="bar.length > 5 ? 6 : 8" 
            text-anchor="middle"
            fill="black">
            {{ bar.label }}
          </text>
          
          <text
            [attr.x]="OFFSET_X + (i * barWidth()) + (barWidth() / 2)"
            [attr.y]="165 - (bar.count * (150 / maxCount))"
            font-size="7"
            text-anchor="middle"
            fill="#673ab7">
            {{ bar.count }}
          </text>
        </g>
      </svg>
    </div>
    }
  </section>
  `,
  styles: [
    `
    select{ margin-left:60%;}
    .admin{ padding:12px } .grid{ display:flex; gap:12px; flex-wrap:wrap } .create{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
    
    .chart-container {
        width: 100%;
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 8px;
      }

      svg {
        overflow: visible;
      }

      rect {
        transition: all 0.3s ease; /* Para que las barras se animen al crecer */
      }

      rect:hover {
        fill: #35495e;
      }

      @media(max-width:600px){
        .chart-container {
          width: 92%;
        }
        select{ margin-left:40%;}
      }
    `
  ]
})
export class Graphics implements OnInit {
  funnels: Funnel[] = [];
  error: string | null = null;

  labelX: string = 'Meses';
  labelY: string = 'Cantidad de visitantes';

  chartData: any;
  maxTicks:number = 0;
  maxCount:number = 0;

  paths: string[] = [];

  readonly CHART_WIDTH = 300; 
  readonly CHART_HEIGHT = 150;
  readonly OFFSET_X = 40; // Espacio para el eje Y

  constructor(private service: FunnelPathService, private cd: ChangeDetectorRef) {
  }
      
   async ngOnInit() {
    try{
        this.funnels = await firstValueFrom(this.service.getAllFunnel());
        this.chartData = this.getChartData();
        this.cd.markForCheck();
      }catch(error){
        this.error = 'Error al cargar los datos: ' + error;
      }
   }

  onSelectionChange(event: any) {
      const value = event.target.value;
      switch(value) {
        case 'count':
          this.labelX = "Meses";
          this.labelY = "Cantidad de visitantes";
          break;
        case 'percentage':
          this.labelX = "Rutas / botones";
          this.labelY = "Promedio clicks x visitantes";
          break;
        case 'total':
          this.labelX = "Rutas / botones";
          this.labelY = "Clicks totales";
          break;
      }
      this.chartData = this.getChartData();
      this.cd.markForCheck();
  }

  getChartData(): {label:string, count:number}[] | undefined {
    if(this.labelY === 'Cantidad de visitantes') {
      const monthCounts: { [key: string]: number } = {};
      this.funnels.forEach(funnel => {
        const month = new Date(funnel.createdAt!).toLocaleString('default', { month: 'short', year: 'numeric' });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });
      const result = Object.keys(monthCounts).map(month => ({
        label: month,
        count: monthCounts[month]
      }));
      this.maxCount = Math.max(...result.map(r => r.count));  // ← AGREGA ESTA LÍNEA
      return result;
    }else {
      this.paths = []; // Reiniciamos el array de paths antes de llenarlo nuevamente

      let visitorCounts:number = 0;
      this.funnels.forEach(funnel => {
        visitorCounts++; // Contamos cada funnel como un visitante
        // 1. Accedemos al array de strings del objeto funnel
        this.paths.push(...funnel.visitorPaths);
      });
      
      const filteredPaths = this.paths.filter(path => {
        const blackList = ['page_hidden', 'page_closed', 'page_visible', 'null'];
        return !blackList.includes(path) && path.trim() !== '';
      });

        // 2. Usamos 'reduce' para contar las repeticiones
      const counts = filteredPaths.reduce((acc, step) => {
        // Si el paso ya existe en el acumulador, sumamos 1, si no, empezamos en 1
        acc[step] = (acc[step] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      
      this.maxTicks = filteredPaths.length; // Guardamos el número total de pasos para ajustar la escala del gráfico
      this.maxCount = Math.max(...Object.values(counts)); // Guardamos el máximo conteo para ajustar la escala del gráfico  
      this.paths = filteredPaths; // Guardamos los paths filtrados para mostrar en la tabla
      
      if(this.labelY === 'Promedio clicks x visitantes'){
        // 3. Transformamos ese objeto en un array para el *ngFor
        return Object.keys(counts).map(key => {    
          return {
            label: key,
            count: this.mathRound(counts[key] / visitorCounts) // Calculamos el promedio dividiendo el conteo por el número total de visitantes
          };
        });
      }else if(this.labelY === 'Clicks totales'){
        // 3. Transformamos ese objeto en un array para el *ngFor
        return Object.keys(counts).map(key => {    
          return {
            label: key,
            count: counts[key] // Devolvemos el conteo total sin dividir
          };
        });
      }
      return undefined; 
    }
  }
 
  mathRound(val: number) {
    return Math.round(val);
  }

  barWidth(): number {
    if (!this.chartData || this.chartData.length === 0) return 30;
    // Dividimos el ancho disponible entre el número de barras, dejando un margen
    return (this.CHART_WIDTH - this.OFFSET_X) / this.chartData.length;
  }
}
