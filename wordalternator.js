const wordAlternation = {
    styleId:null,
    alternationInterval:2000,
    alternatorCounter:0,
    animationList: [
                    {animation_name:'see', animation_delay_increase_by:200, style_properties:{opacity:'0'}},
                    {animation_name:'saw', animation_delay_increase_by:200, style_properties:{opacity:'1'}},
        ],
    animationCounter:0,
    wordsForAlternate:['Father','ex-Pharmacist','Lazy','Dreamer','Human', 'Developer'],
    targetClassName:'target',
    targetSpanContainersId: 'wordAlternationSpace',
    init(styleId){
            this.styleId= styleId;
            let insertIndex = this.alternatorCounter % this.wordsForAlternate.length;
            let alter = this.alternate(insertIndex, this.animationCounter);
            this.alternatorCounter++;
    },
    async alternate(insertIndex, animationIndex){
        this.animationCounter = this.animationCounter%this.animationList.length;

        let targetMainSpan = document.querySelector(`#${this.targetSpanContainersId}`);
        let oStylez = Object.values(document.styleSheets).filter(oStyle=> oStyle.ownerNode.id===this.styleId);
        let oRulez = Object.values(oStylez[0].rules);
        let oSelectorz = oRulez.filter(oRule=>oRule.selectorText===`.${this.targetClassName}`);

        targetMainSpan.innerHTML=this.wordsForAlternate[insertIndex].split('').map(letter=>{return `<span>${letter}</span>`}).join('');


        let letterSpans = targetMainSpan.querySelectorAll('span');
        let lastLetterSpan = letterSpans[letterSpans.length-1];

        Object.entries(this.animationList[animationIndex].style_properties).forEach(([k,v])=>{
            oSelectorz[0].style[k]=v;
        })

        //oSelectorz[0].style.opacity=this.animationList[animationIndex].style_properties;
        oSelectorz[0].style.animationName=this.animationList[animationIndex].animation_name;
// *********************************************************************************************
        letterSpans.forEach((oSpa,sIndex)=>{
            oSpa.style.animationDelay = (sIndex*this.animationList[animationIndex].animation_delay_increase_by)+'ms';
            oSpa.classList.add(this.targetClassName);
        })
// *********************************************************************************************
        lastLetterSpan.addEventListener('animationend',()=>{
            if(animationIndex===this.animationList.length-1){
                this.init(this.styleId);

            }else{
                this.alternate(insertIndex,animationIndex+1)
            }
        })

    },
}



window.addEventListener('load',()=>{
    wordAlternation.init('A123');
})




