<template>
  <div class="py-32 text-center">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl text-cdark">Report</h2>
      <div class="flex justify-center items-center space-x-3 pt-10 px-10">
        <label for="date">Date</label>
        <input name="date" class="border border-gray-300 rounded p-2" type="date" v-model="dateFilter" />
        <label for="tickets">Ticket Type</label>
        <select name="tickets" id="tickets" class="border border-gray-300 rounded p-2 w-24" v-model="typeFilter">
          <option v-for="(type, i) in ticketTypes" :key="i" :value="type">{{type}}</option>
        </select>
        <button 
          class="border rounded border-gray-300 p-2 bg-cdark text-white"
          @click="searchFilter">
            Search
        </button>
      </div>
      <div class="flex justify-center mt-20">
        <table class="divide-y divide-gray-300 ">
          <thead class="bg-gray-50">
              <tr>
                  <th class="px-6 py-2 text-gray-500">Ticket Type</th>
                  <th class="px-6 py-2 text-gray-500">Ticket Number</th>
                  <th class="px-6 py-2 text-gray-500">Price</th>
                  <th class="px-6 py-2 text-gray-500">Buyer</th>
                  <th class="px-6 py-2 text-gray-500">Date</th>
              </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-300">
              <tr class="whitespace-nowrap" v-for="(ticket, t) in tickets" :key="t">
                  <td class="px-6 py-4 text-gray-500">{{ ticket.ticket_type }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ ticket.ticket }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ formattedPrice(ticket.price) }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ ticket.buyer }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ formattedDate(ticket.date) }}</td>
              </tr>
          </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import axios from 'axios'
import { ref, computed } from "vue";

export default {
  setup() {
    let soldTickets = ref([]);
    let tickets = ref([]);

    const callSoldTicketApi = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/sold-tickets');
        soldTickets.value = data
        tickets.value = data
      } catch (error) {
        console.log("error: ", error)
        throw error;
      }
    }

    callSoldTicketApi();

    const ticketTypes = computed(() => {
      let typesWithDup = soldTickets.value.map((s) => s.ticket_type)
      let types = [...new Set(typesWithDup)]
      types = ['ALL', ...types]
      return types
    })
 
    const dateFilter = ref(dayjs().format('YYYY-MM-DD'))
    const typeFilter = ref('ALL')

    const formattedPrice = (price) => price.toLocaleString("en-US")
    const formattedDate = (date) => dayjs(date).format('DD/MM/YYYY')

    const searchFilter = () => {
      if(typeFilter.value === 'ALL') {
        tickets.value = soldTickets.value.filter((sold) => sold.date === dateFilter.value)
      } else {
        tickets.value = soldTickets.value.filter((sold) => sold.date === dateFilter.value && sold.ticket_type === typeFilter.value)
      }
    }
    
    return { tickets, ticketTypes, dateFilter, typeFilter, searchFilter, formattedDate, formattedPrice }
  }
};
</script>