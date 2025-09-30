import {LevelEnum, TimestampEnum} from "@/enums";
import {CONSOLE_COLORS} from "@/constantes/colors.constante";
import {NumberUtility} from "@/utilities/number";
import pad = NumberUtility.pad;

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
            bg = "\x1b[101m";
            fg = "\x1b[97m";
            break;
        case LevelEnum.CRITICAL:
            bg = "\x1b[105m";
            fg = "\x1b[97m";
            break;
        case LevelEnum.ERROR:
            bg = "\x1b[41m";
            fg = "\x1b[97m";
            break;
        case LevelEnum.WARN:
            bg = "\x1b[43m";
            fg = "\x1b[30m";
            break;
        case LevelEnum.NOTICE:
            bg = "\x1b[104m";
            fg = "\x1b[97m";
            break;
        case LevelEnum.INFO:
            bg = "\x1b[239m";
            fg = "\x1b[251m";
            break;
        case LevelEnum.DEBUG:
            bg = "\x1b[53m";
            fg = "\x1b[97m";
            break;
        case LevelEnum.TRACE:
            bg = "\x1b[40m";
            fg = "\x1b[37m";
            break;
        case LevelEnum.DONE:
            bg = "\x1b[102m";
            fg = "\x1b[30m";
            break;
        case LevelEnum.NORMAL:
        default:
            bg = "\x1b[235m";
            fg = "\x1b[244m";
            break;
    }
    return `${fg}${bg}${text}\x1b[0m`;
}

export function consoleForLevel(level: LevelEnum) {
    if (level === LevelEnum.ERROR || level === LevelEnum.FATAL || level === LevelEnum.CRITICAL) return console.error.bind(console);
    if (level === LevelEnum.WARN) return console.warn.bind(console);
    return console.log.bind(console);
}

export function consoleToUpperLevel(level: LevelEnum | undefined): string {
    if (!level) return "INFO";
    return String(level).toUpperCase();
}

export function consoleFormatTimestamp(date: Date, fmt: TimestampEnum): string {
    const DD = pad(date.getDate());
    const MM = pad(date.getMonth() + 1);
    const YYYY = String(date.getFullYear());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    const SSS = pad(date.getMilliseconds(), 3);

    switch (fmt) {
        case "HH:mm:ss":
            return `${HH}:${mm}:${ss}`;
        case "HH:mm:ss.SSS":
            return `${HH}:${mm}:${ss}.${SSS}`;
        case "DD/MM/YYYY HH:mm:ss":
            return `${DD}/${MM}/${YYYY} ${HH}:${mm}:${ss}`;
        case "DD/MM/YYYY HH:mm:ss.SSS":
            return `${DD}/${MM}/${YYYY} ${HH}:${mm}:${ss}.${SSS}`;
        default:
            return `${HH}:${mm}:${ss}`;
    }
}
