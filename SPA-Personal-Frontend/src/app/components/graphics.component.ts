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
      <svg viewBox="0 0 350 200">
        <line x1="40" y1="10" x2="40" y2="170" stroke="#333" stroke-width="2" />
        <g *ngFor="let tick of [0, 0.5, 1]; let i = index">
          <text x="35" [attr.y]="170 - (i * 80)" text-anchor="end" font-size="8" fill="#666">
            {{ mathRound(maxCount * i * 0.5) }}
          </text>
        </g>
        <g>
          <text
            [attr.x]="-100"
            [attr.y]="10"
            [attr.transform]="'rotate(-90) '"
            text-anchor="start"
            font-size="15">
              Clicks
          </text>
        </g>

        <line x1="40" y1="170" x2="310" y2="170" stroke="#333" stroke-width="2" />
          <g>
            <text
              [attr.x]="190"
              [attr.y]="205"
              text-anchor="middle"
              font-size="15">
                Rutas / botones
            </text>
          </g>

        <g *ngFor="let bar of chartData; let i = index">
          <rect
            [attr.x]="OFFSET_X + (i * barWidth()) + (barWidth() * 0.1)" 
            [attr.y]="170 - (bar.count * (150 / maxCount))"
            [attr.width]="barWidth() * 0.85" 
            [attr.height]="bar.count * (150 / maxCount)"
            fill="#e20909"
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
    `.admin{ padding:12px } .grid{ display:flex; gap:12px; flex-wrap:wrap } .create{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
    
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
    `
  ]
})
export class Graphics implements OnInit {
  funnels: Funnel[] = [];
  error: string | null = null;

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

  getChartData() {
    this.paths = []; // Reiniciamos el array de paths antes de llenarlo nuevamente

    this.funnels.forEach(funnel => {
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
    
    // 3. Transformamos ese objeto en un array para el *ngFor
    return Object.keys(counts).map(key => {    
      return {
        label: key,
        count: counts[key]
      };
    });
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
