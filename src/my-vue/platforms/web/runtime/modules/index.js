/**
 * 该目录存放的是与Web平台相关的运行时模块代码
 * 在Vue的核心实现中，不同的平台（如Web、Weex等）会有特定的runtime实现，这些模块提供了针对Web环境下的核心功能和DOM操作。
 * 这个目录中的文件通常包含了Vue组件在渲染过程中涉及的关键逻辑，例如：
 * 1.数据绑定和响应式系统的具体实现，包括对属性、事件、样式、类名等的处理。
 * 2.更新虚拟DOM与实际DOM交互的功能。
 * 3.生命周期钩子函数的调度。
 * 4.针对特殊指令（如v-model、v-if、v-for等）的解析和执行逻辑。
 * 5.插槽（slot）机制的相关实现。
 */
import attrs from './attrs';
import style from './style';
import klass from './class';
import events from './events';


export default [style, klass, attrs, events];