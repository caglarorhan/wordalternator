const wordAlternation = {
    styleId:null,
    alternationInterval:2000,
    alternatorCounter:0,
    animationList: ['see','saw'],
    wordsForAlternate:['Father','ex-Pharmacist','Lazy','Dreamer','Human', 'Developer'],
    init(styleId){
            this.styleId= styleId;
            let wordIndex = this.wordsForAlternate.length;
            let insertIndex = this.alternatorCounter%wordIndex;
            let alter = this.alternate(insertIndex, styleId);
            this.alternatorCounter++;
    },
    async alternate(insertIndex){
        let targetMainSpan = document.querySelector('#wordAlternationSpace');
        let oStylez = Object.values(document.styleSheets).filter(oStyle=> oStyle.ownerNode.id===this.styleId);
        let oRulez = Object.values(oStylez[0].rules);
        let oSelectorz = oRulez.filter(oRule=>oRule.selectorText==='.target');

        targetMainSpan.innerHTML=this.wordsForAlternate[insertIndex].split('').map(letter=>{return `<span>${letter}</span>`}).join('');

        let animDelayIncrease = 200;
        let letterSpans = targetMainSpan.querySelectorAll('span');
        let lastLetterSpan = letterSpans[letterSpans.length-1];

        oSelectorz[0].style.opacity='0';
        oSelectorz[0].style.animationName='see';

        letterSpans.forEach((oSpa,sIndex)=>{
            oSpa.style.animationDelay=sIndex*animDelayIncrease+'ms';
            oSpa.classList.add('target');
        })
        lastLetterSpan.addEventListener('animationend',()=>{
            oSelectorz[0].style.opacity='1';
            oSelectorz[0].style.animationName='saw';
            this.tourOfAnimation?this.init(this.styleId):null;
            this.tourOfAnimation = !this.tourOfAnimation;
        })

    },
}



window.addEventListener('load',()=>{
    wordAlternation.init('A123');
})




