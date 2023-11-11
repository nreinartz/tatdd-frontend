import * as echarts from 'echarts/core';

import { BarChart, LineChart, PieChart } from 'echarts/charts';

import { UniversalTransition } from 'echarts/features';

import {
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
    MarkLineComponent
} from 'echarts/components';

import { SVGRenderer } from 'echarts/renderers';

echarts.use([
    BarChart,
    LineChart,
    PieChart,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
    MarkLineComponent,
    UniversalTransition,
    SVGRenderer
]);

export default echarts;