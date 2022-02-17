import {FormClient} from './FormClient/index'
import {FormService} from './FormService/index'
import {FormFiles} from './FormFiles/index'

export function SwitcherForm({menuState}) {
    switch (menuState) {
        case 0:
            return <FormClient />
        case 1:
            return <FormService />
        case 2:
            return <FormFiles />
    }
}