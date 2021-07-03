export default class Identity {
    name;
    profession;
    race;
    age;
    gender;
    handedness;
    heightAndWeight;
    description;
    distinctiveFeatures;
    constructor( name="New Character",
        profession="",
        race="",
        age=0,
        gender="",
        handedness="",
        heightAndWeight="",
        description="",
        distinctiveFeatures=""
    ) {
        this.name=name;
        this.profession=profession;
        this.race=race;
        this.age=age;
        this.gender=gender;
        this.handedness=handedness;
        this.heightAndWeight=heightAndWeight;
        this.description=description;
        this.distinctiveFeatures=distinctiveFeatures;
    }

}

export function getDefaultIdentity() {
    return new Identity();
}