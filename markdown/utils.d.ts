import { MarkdownIt, Token } from 'markdown-it';
export declare type AlterTokenFunction = (token: Token) => Token;
export declare function alterToken(rule: string, alter: AlterTokenFunction, md: MarkdownIt): MarkdownIt;
