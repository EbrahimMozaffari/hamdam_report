export const namespaced = true;

export const state = {
   hamdamData: {
    "male":{
        "count":767,
        "factors":[
            {"HasSpecificDisease": [
                {"-1":35},
                {"0":710},
                {"1":22}
            ]},
            {"IncomeLevel":[
                {"1":16},
                {"2":5},
                {"3":17},
                {"4":136},
                {"5":330},
                {"6":162},
                {"7":35},
                {"8":19},
                {"9":40},
                {"10":7}
            ]},
            {
                "JobStatus":[
                    {"0":36},
                    {"1":31},
                    {"2":40},
                    {"3":655},
                    {"4":5}
                ]
            }
        ]
    },
    "female":{
        "count":1015,
        "factors":[
            {"HasSpecificDisease": [
                {"-1":54},
                {"0":936},
                {"1":25}
            ]},
            {"IncomeLevel":[
                {"1":275},
                {"2":65},
                {"3":114},
                {"4":235},
                {"5":206},
                {"6":52},
                {"7":9},
                {"8":3},
                {"9":55},
                {"10":1}
            ]},
            {
                "JobStatus":[
                    {"0":21},
                    {"1":247},
                    {"2":58},
                    {"3":648},
                    {"4":41}
                ]
            }
        ]
    }

},

};

export const getters = {
  getHamdamData(state) {
    return state.hamdamData;
  },
  getTotalCount(state) {
    return state.hamdamData.male.count + state.hamdamData.female.count;
  },
  getMalePercent(state) {
    return (state.hamdamData.male.count*100)/(state.hamdamData.male.count + state.hamdamData.female.count);
  },
  getFemalePercent(state) {
    return (state.hamdamData.female.count*100)/(state.hamdamData.male.count + state.hamdamData.female.count);
  },

};
export const mutations = {
  SET_HAMDAM_DATA(state, payload) {
    state.hamdamData = payload;
  },

};

export const actions = {
  async fetchHamdamData({ commit }) {
    try {
      let data = await axios
        .get("http://localhost:3000/male", {
        })
        .then((response) => {
          console.log("SUCCESS!!", response.data);

          // return response.data.file.url;
          return response.data;
          //funcCreate(response.data.file.url);
        })
        .catch(function(error) {
          console.log("FAILURE!!", error);
        });
console.log("dataaa",data)
      if (data) {
        commit("SET_HAMDAM_DATA", data.data);
      }
    } catch (e) {
      console.log(e);
    }
  },
};
