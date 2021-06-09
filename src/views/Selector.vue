<template>
  <v-main>
    <v-container class="text-right selector pr-2">
      <h1 class="text-lg-center">selector</h1>
      <v-row class="mb-5"> </v-row>
      <v-row class="">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <label v-on="on" @click="GenderAll" for="">جنسیت:</label>
          </template>
          <ul class="toolTipIcon">
            <li><v-icon>mdi-human-male mdi-light</v-icon> مرد</li>
            <li><v-icon>mdi-human-female mdi-light</v-icon> زن</li>
          </ul>
        </v-tooltip>

        <v-checkbox
          class="mt-0"
          v-model="Gender"
          color="success"
          off-icon="mdi-human-male"
          on-icon="mdi-human-male"
          value="male"
          @change="log(Gender)"
        >
        </v-checkbox>

        <v-checkbox
          class="mt-0"
          v-model="Gender"
          color="success"
          off-icon="mdi-human-female"
          on-icon="mdi-human-female"
          value="female"
          @change="log(Gender)"
        ></v-checkbox>
        <v-col cols="1" sm="1" md="1"> </v-col>
        <v-col cols="1" sm="1" md="1"> </v-col>
      </v-row>
      <v-row>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <label v-on="on" @click="HasSpecificDiseaseAll">بیماری خاص:</label>
          </template>
          <ul class="toolTipIcon">
            <li><v-icon>mdi-check-circle mdi-light</v-icon> دارد</li>
            <li><v-icon>mdi-close-circle mdi-light</v-icon> ندارد</li>
            <li><v-icon>mdi-minus-circle mdi-light</v-icon> ثبت نشده</li>
          </ul>
        </v-tooltip>

        <v-checkbox
          class="mt-0"
          v-model="HasSpecificDisease"
          color="success"
          off-icon="mdi-check-circle"
          on-icon="mdi-check-circle"
          value="1"
          @change="log(HasSpecificDisease)"
        ></v-checkbox>
        <v-checkbox
          class="mt-0"
          v-model="HasSpecificDisease"
          color="success"
          off-icon="mdi-close-circle"
          on-icon="mdi-close-circle"
          value="-1"
          @change="log(HasSpecificDisease)"
        ></v-checkbox>
        <v-checkbox
          class="mt-0"
          v-model="HasSpecificDisease"
          color="success"
          off-icon="mdi-minus-circle"
          on-icon="mdi-minus-circle"
          value="0"
          @change="log(HasSpecificDisease)"
        ></v-checkbox>
        <span class="percent" v-if="HasSpecificDiseasePercent"
          >{{ HasSpecificDiseasePercent }} %</span
        >
      </v-row>
      <v-row>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <label v-on="on" @click="IncomeLevelAll" for="">سطح درآمد :</label>
          </template>
          <ul class="toolTipIcon">
            <li v-for="item in 10" :key="item">
              <v-icon v-html="`mdi-numeric-${item}-circle mdi-light`"></v-icon>
              {{ incomeItems[item - 1] }}
            </li>
          </ul>
        </v-tooltip>

        <v-checkbox
          v-for="index in 10"
          :key="index"
          class="mt-0"
          v-model="IncomeLevel"
          color="success"
          :off-icon="`mdi-numeric-${index}-circle`"
          :on-icon="`mdi-numeric-${index}-circle`"
          :value="`${index}`"
          @change="log(IncomeLevel)"
        ></v-checkbox>
        <span class="percent" v-if="IncomeLevelPercent"
          >{{ IncomeLevelPercent }} %</span
        >
      </v-row>
      <v-row>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <label v-on="on" @click="JobStatusAll" for="">وضعیت شغلی :</label>
          </template>
          <ul class="toolTipIcon">
            <li><v-icon>mdi-minus-circle mdi-light</v-icon> اهمیتی ندارد</li>
            <li><v-icon>mdi-close-circle mdi-light</v-icon> بیکار</li>
            <li><v-icon>mdi-home-circle mdi-light</v-icon> خانه دار</li>
            <li><v-icon>mdi-account-hard-hat mdi-light</v-icon> شاغل</li>
            <li><v-icon>mdi-hiking mdi-light</v-icon> بازنشسته</li>
          </ul>
        </v-tooltip>

        <v-checkbox
          class="mt-0"
          v-model="JobStatus"
          color="success"
          off-icon="mdi-minus-circle"
          on-icon="mdi-minus-circle"
          value="0"
          @change="log(JobStatus)"
        ></v-checkbox>
        <v-checkbox
          class="mt-0"
          v-model="JobStatus"
          color="success"
          off-icon="mdi-close-circle"
          on-icon="mdi-close-circle"
          value="1"
          @change="log(JobStatus)"
        ></v-checkbox>
        <v-checkbox
          class="mt-0"
          v-model="JobStatus"
          color="success"
          off-icon="mdi-home-circle"
          on-icon="mdi-home-circle"
          value="2"
          @change="log(JobStatus)"
        ></v-checkbox>
        <v-checkbox
          class="mt-0"
          v-model="JobStatus"
          color="success"
          off-icon="mdi-account-hard-hat"
          on-icon="mdi-account-hard-hat"
          value="3"
          @change="log(JobStatus)"
        ></v-checkbox>
        <v-checkbox
          class="mt-0"
          v-model="JobStatus"
          color="success"
          off-icon="mdi-hiking"
          on-icon="mdi-hiking"
          value="4"
          @change="log(JobStatus)"
        ></v-checkbox>
        <span class="percent" v-if="JobStatusPercent"
          >{{ JobStatusPercent }} %</span
        >
        <!-- mdi-human-wheelchair -->
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Selector",
  data: () => ({
    val: false,
    status: true,
    status2: false,
    Gender: [],
    HasSpecificDisease: [],
    HasSpecificDiseasePercent: 0,
    IncomeLevel: [],
    IncomeLevelPercent: 0,
    JobStatus: [],
    JobStatusPercent: 0,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    incomeItems: [
      "در حال حاظر درآمدی ندارم",
      "کمتر از یک میلیون تومان",
      "بیش از یک میلیون تا دو میلیون تومان",
      "بیش از دو میلیون تا چهار میلیون تومان",
      "بیش از چهار میلیون تا هشت میلیون تومان",
      "بیش از هشت میلیون تا دوازده میلیون تومان",
      "بیش از دوازده میلیون تا شانزده میلیون تومان",
      "بیش از شانزده میلیون تا بیست و پنج میلیون تومان",
      "بیش از بیست و پنج میلیون تا پنجاه میلیون تومان",
      "بیش از پنجاه میلیون تومان",
    ],
  }),
  methods: {
    log(val) {
      if (val) {
        console.log(val);
      }

      let data = this.$store.state.app.hamdamData;

      let total = this.$store.getters["app/getTotalCount"];
      let malePercent = this.$store.getters["app/getMalePercent"];
      let femalePercent = this.$store.getters["app/getFemalePercent"];

      console.log("total", total);
      console.log(
        "malePercent",
        Math.round(malePercent * 100) / 100,
        Math.round(femalePercent * 100) / 100
      );
      let totalSelect = 0;
      let totalHasSpecificDisease = 0;
      let totalIncomeLevel = 0;
      let totalJobStatus = 0;
      this.Gender.forEach((element) => {
        totalSelect += data[element]["count"];
        let dataMaleOrFemal = element;
        this.HasSpecificDisease.forEach((element) => {
          let datahasSpecific = element;
          let newArray = data[dataMaleOrFemal]["factors"][0][
            "HasSpecificDisease"
          ].filter((el) => {
            return el[datahasSpecific] !== undefined;
          });
          console.log("HasSpecificDisease", newArray[0][datahasSpecific]);
          totalHasSpecificDisease += newArray[0][datahasSpecific];
        }); //end of HasSpecificDisease

        this.IncomeLevel.forEach((element) => {
          let dataIncomeLevel = element;
          let newArray = data[dataMaleOrFemal]["factors"][1][
            "IncomeLevel"
          ].filter((el) => {
            return el[dataIncomeLevel] !== undefined;
          });
          console.log("IncomeLevel", newArray[0][dataIncomeLevel]);
          totalIncomeLevel += newArray[0][dataIncomeLevel];
        }); //end of IncomeLevel

        this.JobStatus.forEach((element) => {
          let dataJobStatus = element;
          let newArray = data[dataMaleOrFemal]["factors"][2][
            "JobStatus"
          ].filter((el) => {
            return el[dataJobStatus] !== undefined;
          });
          if (newArray !== undefined) {
          console.log("totalJobStatus", newArray[0][dataJobStatus]);
            totalJobStatus += newArray[0][dataJobStatus];
          }
        }); //end of dataJobStatus

        //console.log(data[element]['count']);
      }); //end of Gender
      console.log("totalSelect", totalSelect);
      console.log("totalHasSpecificDisease", totalHasSpecificDisease);
      console.log("totalIncomeLevel", totalIncomeLevel);
      console.log("totalJobStatus", totalJobStatus);
      this.HasSpecificDiseasePercent =
        Math.round(((totalHasSpecificDisease * 100) / totalSelect) * 100) / 100;

      this.IncomeLevelPercent =
        Math.round(((totalIncomeLevel * 100) / totalSelect) * 100) / 100;

      this.JobStatusPercent =
        Math.round(((totalJobStatus * 100) / totalSelect) * 100) / 100;
    },
    GenderAll() {
      this.Gender = ["male", "female"];
      this.log();
    },
    HasSpecificDiseaseAll() {
      this.HasSpecificDisease = ["1", "0", "-1"];
      this.log();
    },
    IncomeLevelAll() {
      this.IncomeLevel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      this.log();
    },
    JobStatusAll() {
      this.JobStatus = ["0", "1", "2", "3", "4"];
      this.log();
    },
  },
  mounted() {
    // HAD TO ADD THIS CODE FOR IT TO WORK
    let data = this.$store.state.app.hamdamData;
    console.log("HamdamData", data.male);
    // if (data.length == 0) {
    //   this.$store.dispatch("app/fetchHamdamData");
    // }
  },
  /*
          // data[dataMaleOrFemal]["factors"][0]["HasSpecificDisease"].forEach(element => {
          //   console.log("HasSpecificDisease",element[datahasSpecific]);
          // });
         //console.log("HasSpecificDisease",data[dataMaleOrFemal]["factors"][0]["HasSpecificDisease"]);
  */
};
</script>

<style lang="scss">
.toolTipIcon {
  list-style-type: none;
}
.toolTipIcon li {
  font-family: IRANSansWeb-FaNum-Bold !important;
}
.selector label {
  cursor: pointer;
}
.selector .percent {
  line-height: 2;
  margin-right: 10px;
}
//  @import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
