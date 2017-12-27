const Remarkable = require('remarkable')
import { RemarkableInterface } from '../types/markdown'
import { AsyncRenderer } from './AsyncRenderer'

export class AsyncRemarkable extends (Remarkable as RemarkableInterface) implements RemarkableInterface
{
    renderer: AsyncRenderer

    constructor (preset?: string, options?: object) {
        super(preset, options)
        this.renderer = new AsyncRenderer()
    }
}
