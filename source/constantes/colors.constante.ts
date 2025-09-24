import {LevelEnum} from "@/enums";

export const CONSOLE_COLORS: Partial<Record<LevelEnum, { open: string; close: string }>> = {
    [LevelEnum.FATAL]: { open: "\x1b[91m", close: "\x1b[0m" },
    [LevelEnum.CRITICAL]: { open: "\x1b[95m", close: "\x1b[0m" },
    [LevelEnum.ERROR]: { open: "\x1b[31m", close: "\x1b[0m" },
    [LevelEnum.WARN]: { open: "\x1b[33m", close: "\x1b[0m" },
    [LevelEnum.NOTICE]: { open: "\x1b[97m\x1b[104m", close: "\x1b[0m" },
    [LevelEnum.INFO]: { open: "\x1b[37m\x1b[100m", close: "\x1b[0m" },
    [LevelEnum.NORMAL]: { open: "", close: "" },
    [LevelEnum.DEBUG]: { open: "\x1b[35m", close: "\x1b[0m" },
    [LevelEnum.TRACE]: { open: "\x1b[90m", close: "\x1b[0m" },
};