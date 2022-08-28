export class Knapsack_Greedy_Data {
    weight: number;
    benefit: number;
    index_or_label: any;
    benefit_by_weight_Ratio: number;
    taken: number;

    constructor(weight: number, benefit: number, index_or_label: any) {
        this.weight = weight;
        this.benefit = benefit;
        this.index_or_label = index_or_label;
        this.benefit_by_weight_Ratio = benefit / weight;
    }

}

class Knapsack_Greedy {
    greedy_data: Knapsack_Greedy_Data[];

    constructor(greedy_data: Knapsack_Greedy_Data[]) {
        this.greedy_data = greedy_data;
    }

    sortBy_benefit_by_weight_Ratio_desc(): void {
        this.greedy_data.sort((a, b) => b.benefit_by_weight_Ratio - a.benefit_by_weight_Ratio);
    }

    getKnapsack_AsManyAsPossible_withLimit(maxStorage: number): [number, number, Knapsack_Greedy_Data[]] {
        this.sortBy_benefit_by_weight_Ratio_desc();
        let currentWeight = 0;
        let currentBenefit = 0;
        let selectedItem: Knapsack_Greedy_Data[] = [];

        for (let i = 0; i < this.greedy_data.length; i++) {
            if (currentWeight + this.greedy_data[i].weight <= maxStorage) {
                selectedItem.push(this.greedy_data[i]);
                currentWeight += this.greedy_data[i].weight;
                this.greedy_data[i].taken = this.greedy_data[i].weight;
                currentBenefit += this.greedy_data[i].benefit;
            }
        }
        return [currentWeight, currentBenefit, selectedItem];
    }

    getKnapsack_AsManyAsPossible_withLimit_subtract(maxStorage: number): [number, number, Knapsack_Greedy_Data[]] {
        this.sortBy_benefit_by_weight_Ratio_desc();
        let currentWeight = 0;
        let currentBenefit = 0;
        let selectedItem: Knapsack_Greedy_Data[] = [];

        for (let i = 0; i < this.greedy_data.length; i++) {
            if (currentWeight + this.greedy_data[i].weight <= maxStorage) {
                selectedItem.push(this.greedy_data[i]);
                currentWeight += this.greedy_data[i].weight;
                this.greedy_data[i].taken = this.greedy_data[i].weight;
                this.greedy_data[i].weight = 0;
                currentBenefit += this.greedy_data[i].benefit;
            }
        }
        return [currentWeight, currentBenefit, selectedItem];
    }

    getKnapsack_AsManyAsPossible_withLimit_max(maxStorage: number): [number, number, Knapsack_Greedy_Data[]] {
        this.sortBy_benefit_by_weight_Ratio_desc();

        let currentWeight = 0;
        let currentBenefit = 0;
        let selectedItem: Knapsack_Greedy_Data[] = [];
        for (let i = 0; i < this.greedy_data.length; i++) {
            if (currentWeight + this.greedy_data[i].weight <= maxStorage) {
                selectedItem.push(this.greedy_data[i]);
                currentWeight += this.greedy_data[i].weight;
                currentBenefit += this.greedy_data[i].benefit;
            } else {
                selectedItem.push(this.greedy_data[i]);
                let lastTaken_inFraction = Math.min(this.greedy_data[i].weight, maxStorage - currentWeight);
                this.greedy_data[i].taken = lastTaken_inFraction;
                currentWeight += lastTaken_inFraction;
                currentBenefit += this.greedy_data[i].benefit * (lastTaken_inFraction / this.greedy_data[i].weight);
                break;
            }
        }
        return [currentWeight, currentBenefit, selectedItem];
    }


    getKnapsack_AsManyAsPossible_withLimit_max_subtract(maxStorage: number): [number, number, Knapsack_Greedy_Data[]] {
        this.sortBy_benefit_by_weight_Ratio_desc();

        let currentWeight = 0;
        let currentBenefit = 0;
        let selectedItem: Knapsack_Greedy_Data[] = [];
        for (let i = 0; i < this.greedy_data.length; i++) {
            if (currentWeight + this.greedy_data[i].weight <= maxStorage) {
                selectedItem.push(this.greedy_data[i]);
                currentWeight += this.greedy_data[i].weight;
                currentBenefit += this.greedy_data[i].benefit;
                this.greedy_data[i].weight=0;
            } else {
                selectedItem.push(this.greedy_data[i]);
                let lastTaken_inFraction = Math.min(this.greedy_data[i].weight, maxStorage - currentWeight);
                this.greedy_data[i].taken = lastTaken_inFraction;
                currentWeight += lastTaken_inFraction;
                currentBenefit += this.greedy_data[i].benefit * (lastTaken_inFraction / this.greedy_data[i].weight);
                this.greedy_data[i].weight -= lastTaken_inFraction;
                break;
            }
        }
        return [currentWeight, currentBenefit, selectedItem];
    }

}

function test_knapsack_selection() {
    let weight = [2, 3, 4, 2, 5, 4, 1];
    let price = [7, 6, 9, 6, 12, 10, 3];
    let greedy_data_Knapsack = [];
    for (let i = 0; i < weight.length; i++) {
        greedy_data_Knapsack.push(new Knapsack_Greedy_Data(weight[i], price[i], i));
    }

    let greedy = new Knapsack_Greedy(greedy_data_Knapsack);
    console.log(greedy.getKnapsack_AsManyAsPossible_withLimit(7));
    console.log(greedy.getKnapsack_AsManyAsPossible_withLimit_max(7));

}

test_knapsack_selection();