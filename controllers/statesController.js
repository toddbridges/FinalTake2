const data = {};
data.states = require('../data/statesData.json');

//This is from the Mongo database
const State = require('../model/State.js');
// const verifyState = require('../middleware/verifyState.js');

const stateCodes = [];
const j = require('../data/statesData.json');

for(var i in j) {
    var item = j[i];
    stateCodes.push(item.code);
}

const getAllStates = async (req,res) => {

    const contig = req.query.contig;
    
    if(contig == undefined) {  //  return all states data

        
        const states = await State.find();
        // if (!states) return res.status(204).json({'message': 'No states found.'})

        const key = "funfacts";

        let num = 0;
        for(i in data.states) {
            (data.states[i])[key] = states[num++].funfacts; 
        }
        res.json(data.states); 
    } else if(contig == 'true') {  // all states but alaska and hawaii
        //console.log('we are at contig true');
        //console.log(contig);
        /* if(contig === false) {
            console.log("contig is false");
        } */
        const states = await State.find();
        // if (!states) return res.status(204).json({'message': 'No states found.'})

        const key = "funfacts";

        let num = 0;
        for(i in data.states) {
            (data.states[i])[key] = states[num++].funfacts; 
        }
        const statearray = data.states.filter(function( obj ) { 
            return obj.code !== 'AK' && obj.code != 'HI'});

        res.json(statearray); 

    } else if (contig == 'false') {  // just alaska and hawaii

        // console.log("we are here");
        const states = await State.find();
        

        const key = "funfacts";

        let num = 0;
        for(i in data.states) {
            (data.states[i])[key] = states[num++].funfacts; 
        }

        const statearray = data.states.filter(function( obj ) { 
            return obj.code === 'AK' || obj.code === 'HI'});
        res.json(statearray); 
        
    }
}






module.exports = {
    getAllStates,
}