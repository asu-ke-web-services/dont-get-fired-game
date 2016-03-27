export default class CSProgram {
    constructor( name, description,
  onBuyActionPoints, onBuyCaptial, onBuySatisfaction,
  onQuarterActionPoints, onQuarterCaptial, onQuarterSatisfaction ) {
      this.name = name;
      this.description = description;
      this.onBuyActionPoints = onBuyActionPoints;
      this.onBuyCaptial = onBuyCaptial;
      this.onBuySatisfaction = onBuySatisfaction;
      this.onQuarterActionPoints = onQuarterActionPoints;
      this.onQuarterCaptial = onQuarterCaptial;
      this.onQuarterSatisfaction = onQuarterSatisfaction;
      this.image = '/icons/catering-icon.png';
      this.isPurchased = false;
    }
}
