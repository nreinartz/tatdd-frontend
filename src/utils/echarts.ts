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
    MarkLineComponent
} from 'echarts/components';

import { SVGRenderer } from 'echarts/renderers';
import { Scatter3DChart } from 'echarts-gl/charts';
import { Grid3DComponent } from 'echarts-gl/components';

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
    MarkLineComponent,
    UniversalTransition,
    Scatter3DChart,
    Grid3DComponent,
    SVGRenderer
]);

export default echarts;