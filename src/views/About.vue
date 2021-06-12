<template>
  <div class="about">
    <h1>This is an about page</h1>
        <v-container class="text-right selector pr-2">

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
  </div>
</template>
