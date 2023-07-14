
import Markdown = require('markdown-it');
import Clipboard = require('clipboard');

export interface Options {
    iconCopyClass?: string;
    successText?: string;
    successTextDelay: Number;
    buttonClass?: string;
    contentClass?: string;
    titleButton?: string;
    showMoreText?: string;
    showMoreClass?: string;
    showMoreIcon?: string;
    maxStringLengthShortcut: Number;
}

try {
    const clipboard = new Clipboard('.v-markdown-it-code-copy');

    /* tslint:disable */
    clipboard.on('success', function (e) {
        /* tslint:enable */
        const clipboardButton = e.trigger;

        clipboardButton.classList.add('v-markdown-tooltip');

        setTimeout(() => {
            clipboardButton.classList.remove('v-markdown-tooltip');
        }, Number(clipboardButton.getAttribute('delay')));
    });
} catch (e) {
    //
}

function renderCode(origRule, options: Options) {
    return (...args) => {
        const [tokens, idx] = args;
        const content = typeof tokens[idx].content.replaceAll === 'function' ? tokens[idx].content
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&apos;') : [];
        const origRendered = origRule(...args);

        if (content.length === 0) {
            return origRendered;
        }

        // check height for code block
        const context = document.createElement('div');
        context.innerHTML = origRendered;
        context.classList.add('md-contents');
        document.body.appendChild(context);
        const { clientHeight } = context;
        document.body.removeChild(context);
        const isShortCut = clientHeight > options.maxStringLengthShortcut;
        const showMoreElement = isShortCut ?
        `
        <div class="v-content-flex-center">
            <button
                style="display: none"
                class="${options.showMoreClass} button-more"
            >
                <span class="${options.showMoreIcon}"></span>
                <span class="show-more-text">${options.showMoreText}</span>
            </button>
        </div>` : '';

        return `
            <div
                style="position: relative;"
                class="${isShortCut ? options.contentClass : ''}"
                onClick="this.removeAttribute('class');this.querySelectorAll('.${options.showMoreClass}').forEach(el => el.remove());"
                onmouseenter="this.getElementsByClassName('${options.showMoreClass}')[0] ? this.getElementsByClassName('${options.showMoreClass}')[0].style.display='block' : null"
                onmouseleave="this.getElementsByClassName('${options.showMoreClass}')[0] ? this.getElementsByClassName('${options.showMoreClass}')[0].style.display='none' : null"
            >
                ${origRendered}
                <button
                    class="${options.buttonClass}"
                    data-clipboard-text="${content}"
                    delay="${options.successTextDelay}"
                    title="${options.titleButton}"
                >
                    <span class="tooltiptext" style="display: none">${options.successText}</span>
                    <span class="v-markdown-icon ${options.iconCopyClass}"></span>
                </button>
                ${showMoreElement}
            </div>
        `;
    };
}

export default function (md: Markdown.MarkdownIt, options: Options) {
    md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block, options);
    md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options);
}
