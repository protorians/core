import {consoleColorizeLevel} from "@/utilities/console";
import {LevelEnum} from "@/enums";

describe('Test colorize', () => {
    const label = 'Testing'

    describe(`Test colorize "${LevelEnum.FATAL}"`, () => {
        for (const level of Object.values(LevelEnum)) {
            it(`Colorize : ${level}`, () => console.log(consoleColorizeLevel(` ${level.toString()} `, level, true), label))
        }
    })

})