import { RemarkableInterface } from '../types/markdown';
import { AsyncRenderer } from './AsyncRenderer';
declare const AsyncRemarkable_base: RemarkableInterface;
export declare class AsyncRemarkable extends AsyncRemarkable_base implements RemarkableInterface {
    renderer: AsyncRenderer;
    constructor(preset?: string, options?: object);
}
