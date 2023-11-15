import * as echarts from 'echarts/core';

import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';

import { UniversalTransition } from 'echarts/features';

import {
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
    BrushComponent,
    MarkLineComponent,
    MarkAreaComponent
} from 'echarts/components';

import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
import { ScatterGLChart } from 'echarts-gl/charts';

echarts.use([
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
    BrushComponent,
    MarkAreaComponent,
    MarkLineComponent,
    UniversalTransition,
    ScatterGLChart,
    CanvasRenderer
]);

export default echarts;