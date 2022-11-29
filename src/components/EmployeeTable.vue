<template>
  <div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear="">
      <template #thead-top>
        <button
          class="btn btn-light"
          type="button"
          @click="sortByDefault"
          value="toDefault">
          По умолчанию
        </button>
      </template>
      <template #head(name)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByName"
          value="nameIncrease">
          {{ fields.label }}
        </button>
      </template>
      <template #head(gender)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByGender"
          value="genderIncrease">
          {{ fields.label }}
        </button>
      </template>
      <template #head(age)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByAge"
          value="ageIncrease">
          {{ fields.label }}
        </button>
      </template>
      <template #head(phone)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByPhone"
          value="phoneIncrease">
          {{ fields.label }}
        </button>
      </template>

      <template #cell(name)="items"> {{ items.item.levelChild }}{{ items.item.name }} </template>
      <template #cell(gender)="items">
        {{ items.item.gender }}
      </template>
      <template #cell(age)="items">
        {{ items.item.age }}
      </template>
      <template #cell(phone)="items">
        {{ items.item.phone }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "employee-table",
  components: {},
  data() {
    return {
      fields: [
        { key: "name", label: "Имя" },
        { key: "gender", label: "Пол" },
        { key: "age", label: "Возраст" },
        { key: "phone", label: "Телефон" },
      ],
      sort: "",
    };
  },
  computed: {
    items: {
      get() {
        switch (this.sort) {
          case this.$store.getters.sortNameByIncrease:
            return this.sort;
          case this.$store.getters.sortNameByDecrease:
            return this.sort;
          case this.$store.getters.sortGenderByIncrease:
            return this.sort;
          case this.$store.getters.sortGenderByDecrease:
            return this.sort;
          case this.$store.getters.sortAgeByIncrease:
            return this.sort;
          case this.$store.getters.sortAgeByDecrease:
            return this.sort;
          case this.$store.getters.sortPhoneByIncrease:
            return this.sort;
          case this.$store.getters.sortPhoneByDecrease:
            return this.sort;
        }
        return this.$store.state.employeesData;
      },
      set(value) {
        this.sort = value;
      },
    },
  },
  methods: {
    sortByName(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "nameIncrease") {
        this.items = this.$store.getters.sortNameByIncrease;
        event.target.value = "nameDecrease";
      } else if (buttonValue === "nameDecrease") {
        this.items = this.$store.getters.sortNameByDecrease;
        event.target.value = "nameIncrease";
      }
    },
    sortByGender(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "genderIncrease") {
        this.items = this.$store.getters.sortGenderByIncrease;
        event.target.value = "genderDecrease";
      } else if (buttonValue === "genderDecrease") {
        this.items = this.$store.getters.sortGenderByDecrease;
        event.target.value = "genderIncrease";
      }
    },
    sortByAge(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "ageIncrease") {
        this.items = this.$store.getters.sortAgeByIncrease;
        event.target.value = "ageDecrease";
      } else if (buttonValue === "ageDecrease") {
        this.items = this.$store.getters.sortAgeByDecrease;
        event.target.value = "ageIncrease";
      }
    },
    sortByPhone(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "phoneIncrease") {
        this.items = this.$store.getters.sortPhoneByIncrease;
        event.target.value = "phoneDecrease";
      } else if (buttonValue === "phoneDecrease") {
        this.items = this.$store.getters.sortPhoneByDecrease;
        event.target.value = "phoneIncrease";
      }
    },
    sortByDefault(event) {
      this.items = event.target.value;
    },
  },
};
</script>

<style lang="sass" scoped></style>
