Vue.createApp({
    data(){
        return {
            valueInput:"",
            needDoList: [],
            completeList: []
        };
    },
    methods: {
        handlyInput(event) {
            this.valueInput = event.target.value;
        },
        addTask() {
            if(this.valueInput === '') { return };
            this.needDoList.push({
                title : this.valueInput,
                id : Math.random()
            });
            localStorage.needDoList = JSON.stringify(this.needDoList);
            this.valueInput = '';
        },
        doCheck (index, type) {
            if(type === 'need'){
                const completeMask = this.needDoList.splice(index, 1);
                this.completeList.push(...completeMask);
            } else{
                const noCompleteMask = this.completeList.splice(index, 1);
                this.needDoList.push(...noCompleteMask);
            }
            localStorage.needDoList = JSON.stringify(this.needDoList);
            localStorage.completeList = JSON.stringify(this.completeList);
        },
        removeMask(index, type) {
            if(type === 'need'){
                this.needDoList.splice(index, 1);
            } else {
                this.completeList.splice(index, 1);
            }
            localStorage.needDoList = JSON.stringify(this.needDoList);
            localStorage.completeList = JSON.stringify(this.completeList);
        }
    },
    mounted(){
        if(localStorage.needDoList){
            this.needDoList = JSON.parse(localStorage.needDoList);
        }
        if(localStorage.completeList){
            this.completeList = JSON.parse(localStorage.completeList);
        }
    }
}).mount('#app');