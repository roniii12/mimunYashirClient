
import { ReplaySubject } from "rxjs";

export class BaseComponent{
    constructor(){}
    protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    onDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }    
}