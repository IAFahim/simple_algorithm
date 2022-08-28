export class Activity_Selection_Data {
    startTime: number;
    finishTime: number;
    index_or_label: any;

    constructor(startTime: number, finishTime: number, index_or_label: any) {
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.index_or_label = index_or_label;
    }

}

export default class Activity_Selection_Greedy {
    greedy_data: Activity_Selection_Data[];

    constructor(greedy_data: Activity_Selection_Data[]) {
        this.greedy_data = greedy_data;
    }

    sortBy_finishTime(): void {
        this.greedy_data.sort((a, b) => a.finishTime - b.finishTime);
    }

    getActivity_AsManyAsPossible_withLimit(maxStorage: number): [number, Activity_Selection_Data[]] {
        this.sortBy_finishTime();
        let itemCount = 1;
        let selectedItem: Activity_Selection_Data[] = [this.greedy_data[0]];
        let lastPickedItemIndex = 0;

        for (let i = 1; i < this.greedy_data.length && itemCount < maxStorage; i++) {
            if (this.greedy_data[i].startTime > this.greedy_data[lastPickedItemIndex].finishTime) {
                selectedItem.push(this.greedy_data[i]);
                lastPickedItemIndex = i;
                itemCount++;
            }
        }

        return [itemCount, selectedItem];
    }

    getActivity_AsManyAsPossible(): [number, Activity_Selection_Data[]] {
        this.sortBy_finishTime();
        let itemCount = 1;
        let selectedItem: Activity_Selection_Data[] = [this.greedy_data[0]];
        let lastPickedItemIndex = 0;

        for (let i = 1; i < this.greedy_data.length; i++) {
            if (this.greedy_data[i].startTime > this.greedy_data[lastPickedItemIndex].finishTime) {
                selectedItem.push(this.greedy_data[i]);
                lastPickedItemIndex = i;
                itemCount++;
            }
        }

        return [itemCount, selectedItem];
    }
}

function test_acitivity_selection(){
    let startingTime = [1, 3, 0, 5, 3, 5, 6, 8, 8, 2, 12];
    let endingTime = [4, 5, 6, 7, 9, 9, 10, 11, 12, 14, 16];
    let greedy_data_Activity = [];
    for (let i = 0; i < startingTime.length; i++) {
        greedy_data_Activity.push(new Activity_Selection_Data(startingTime[i], endingTime[i], i));
    }

    let greedy = new Activity_Selection_Greedy(greedy_data_Activity);
    console.log(greedy.getActivity_AsManyAsPossible());
    console.log(greedy.getActivity_AsManyAsPossible_withLimit(3));
}

test_acitivity_selection();


