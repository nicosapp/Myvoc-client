<template>
  <div>
    <v-row
      class="primary white--text"
      justify="center"
      align="center"
      style="min-height: 100vh"
    >
      <v-col cols="11" sm="9">
        <p style="font-size: 3rem" class="mb-6 font-title">
          Ready to learn new words?
        </p>
        <p class="text-h4">
          Memorize new words incrementaly by creating your own vocable
          collection and order them by languages
        </p>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="11">
        <v-row style="min-height: 100vh" justify="center" align="center">
          <v-col cols="12" sm="8">
            <p class="font-title" style="font-size: 2rem">
              Create an account and your dictionnaries
            </p>
            <ul class="text-h6">
              <li>Choose your native language</li>
              <li>Create your other dictionnaries</li>
              <li>Choose a color for each dictionnary</li>
            </ul>
          </v-col>
          <v-col cols="12" sm="4"></v-col>
        </v-row>
        <v-row style="min-height: 100vh" justify="center" align="center">
          <v-col cols="12" sm="5"></v-col>
          <v-col cols="12" sm="7">
            <p class="font-title" style="font-size: 2rem">Add your vocable</p>
            <ul class="text-h6">
              <li>Choose your language</li>
              <li>Select the type of vocable (word, locution, example...)</li>
              <li>
                Enter your vocable attribute (grammmar, categories, level of
                language...)
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row style="min-height: 100vh" justify="center" align="center">
          <v-col cols="12" sm="8">
            <p class="font-title" style="font-size: 2rem">
              Order & filter your vocables quickly to revise
            </p>
            <ul class="text-h6">
              <li>Go to your timeline</li>
              <li>
                With the different filters access your vocables as you like
              </li>
              <li>By type, categories, grammar, rating...</li>
              <li>Edit or preview them by clicking on it</li>
            </ul>
          </v-col>
          <v-col cols="12" sm="4"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'home',
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
}
</style>
