<template>
  <div class="city">
    <cityList />
    <!-- <cityAlphabet /> -->
  </div>
</template>

<script>
import store from '@/components/store'
import cityList from './cityList'
// import cityAlphabet from './cityAlphabet'

export default {
  data () {
    return {

    }
  },
  components: {
    cityList
    // cityAlphabet
  }
}
</script>
