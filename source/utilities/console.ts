import {LevelEnum} from "@/enums";
import {CONSOLE_COLORS} from "@/constantes/colors.constante";

export function consoleColorize(text: string, level: LevelEnum, enabled: boolean | undefined): string {
    if (!enabled || level === LevelEnum.SILENT) return text;
    const map = (CONSOLE_COLORS as any)[level];
    if (!map) return text;
    return `${map.open}${text}${map.close}`;
}

export function consoleColorizeLevel(text: string, level: LevelEnum, enabled: boolean | undefined): string {
    if (!enabled || level === LevelEnum.SILENT) return text;
    let bg: string | null = null;
    let fg: string | null = null;
    switch (level) {
        case LevelEnum.FATAL:
            bg = "\x1b[101m"; // bright red bg
            fg = "\x1b[97m"; // white
            break;
        case LevelEnum.CRITICAL:
            bg = "\x1b[105m"; // bright magenta bg
            fg = "\x1b[97m"; // white
            break;
        case LevelEnum.ERROR:
            bg = "\x1b[41m"; // red bg
            fg = "\x1b[97m"; // white
            break;
        case LevelEnum.WARN:
            bg = "\x1b[43m"; // yellow bg
            fg = "\x1b[30m"; // black
            break;
        case LevelEnum.NOTICE:
            bg = "\x1b[104m"; // bright blue bg
            fg = "\x1b[97m"; // white
            break;
        case LevelEnum.INFO:
            bg = "\x1b[100m"; // dark gray bg
            fg = "\x1b[37m"; // light gray
            break;
        case LevelEnum.DEBUG:
            bg = "\x1b[45m"; // magenta bg
            fg = "\x1b[97m"; // white
            break;
        case LevelEnum.TRACE:
            bg = "\x1b[40m"; // black bg
            fg = "\x1b[37m"; // light gray
            break;
        case LevelEnum.DONE:
            bg = "\x1b[102m"; // bright green bg
            fg = "\x1b[30m"; // black
            break;
        case LevelEnum.NORMAL:
        default:
            bg = "\x1b[47m"; // light gray bg
            fg = "\x1b[30m"; // black
            break;
    }
    return `${fg}${bg}${text}\x1b[0m`;
}

export function consoleForLevel(level: LevelEnum) {
    if (level === LevelEnum.ERROR || level === LevelEnum.FATAL || level === LevelEnum.CRITICAL) return console.error.bind(console);
    if (level === LevelEnum.WARN) return console.warn.bind(console);
    return console.log.bind(console);
}

export function toUpperLevel(level: LevelEnum | undefined): string {
    if (!level) return "INFO";
    return String(level).toUpperCase();
}