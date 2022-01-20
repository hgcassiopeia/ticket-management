<template>
  <div class="py-32 text-center">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl text-cdark">Ticket</h2>
      <div class="flex justify-between items-center pt-10 mx-10">
        <div class="text-left">
          <p>Your ticket: {{ currentSelected.toString() }}</p>
          <p>Total Amount: {{ totalAmount.toLocaleString("en-US") }}</p>
        </div>
        <button 
          class="border rounded border-gray-300 p-2 bg-cdark text-white"
          @click="buyTicketValidation">
            BUY TICKET
        </button>
      </div>
      <div class="flex justify-center pt-16 px-10">
        <div class="flex flex-col">
          <div v-for="(ticket, t) in tickets" :key="t">

            <div class="flex">
              <div class="flex items-start mt-2 mx-10">{{ ticket.ticket_type }}</div>
              <div class="flex flex-wrap">
                <div class="w-24" v-for="(index, l) in ticket.amount_limit" :key="l">
                  <button 
                    :disabled="disabled(ticket.ticket_type + index)"
                    :class="classSelected(ticket.ticket_type + index)"
                    class="border rounded border-gray-300 p-2 px-2 m-2 w-20"
                    @click="selectTicket(ticket.ticket_type, index, ticket.price)">
                    {{ ticket.ticket_type + index }} (฿{{ ticket.price.toLocaleString("en-US") }})
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from 'axios'
import { ref, onMounted } from "vue";

export default {
  setup() {
    let tickets = ref([])
    let soldTickets = ref([])

    const callTicketApi = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/tickets');
        tickets.value = data
      } catch (error) {
        console.log("error: ", error)
        throw error;
      }
    }

    const callSoldTicketApi = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/sold-tickets');
        soldTickets.value = data
      } catch (error) {
        console.log("error: ", error)
        throw error;
      }
    }

    const soldList = ref([])
    const disabled = (ticket) => soldList.value.includes(ticket)
    const now = dayjs().format('YYYY-MM-DD')
    onMounted(async () => {
      await callTicketApi();
      await callSoldTicketApi();
      soldTickets.value.forEach((sold) => {
        if(sold.date === now) {
          selected.value.push(sold.ticket)
          soldList.value.push(sold.ticket)
        }
      })
    })

    let selected = ref([])
    let currentSelected = ref([])
    let totalAmount = ref(0)
    let itemTickets = ref([])

    const selectTicket = (type, index, price) => {
      const ticket = type + index;
      if(selected.value.includes(ticket)) {
        selected.value = selected.value.filter((s) => s !== ticket)
        currentSelected.value = currentSelected.value.filter((s) => s !== ticket)
        totalAmount.value -= price
        itemTickets.value = itemTickets.value.filter((item)=> item.ticket != ticket)
      } else {
        selected.value.push(ticket)
        currentSelected.value.push(ticket)
        totalAmount.value += price
        itemTickets.value.push({
          ticket: ticket,
          ticket_type: type,
          price: price
        })
      }
    }

    const classSelected = (ticket) => {
      return {
        'bg-red-500 text-white': selected.value.includes(ticket)
      }
    }

    const buyTicketValidation = () =>{
      if(currentSelected.value.length == 0) {
        alert('Please select some ticket!')
      } 
      else {
        let user = ''
        user = prompt('Please enter your name:', user)
        if(user) {
          let limitTypes = []
          tickets.value.forEach((ticket) => {
            let tmp = { [ticket.ticket_type]: ticket.minimum_buying }
            limitTypes = { ...limitTypes, ...tmp }
          })

          let counts = currentSelected.value.reduce((map, val) => { 
            map[val.charAt(0)] = (map[val.charAt(0)] || 0)+1; return map
          }, {});
          
          let invalid = false
          Object.keys(counts).forEach((type) =>{
            const minimum = limitTypes[type]
            invalid = (counts[type] < minimum) ? true: false;
          })
          
          if(invalid) {
            const message = JSON.stringify(limitTypes)
            alert(`Please buy ticket with minimum require like this --> ${message}`)
          } else {
            itemTickets.value = itemTickets.value.map((item) => {
              item = { ...item, date: now, buyer: user }
              return item
            })
            
            axios.post(`http://localhost:3000/api/sold-tickets`, itemTickets.value).then((res) => {
              if(res.status == 200) {
                callSoldTicketApi();
                totalAmount.value = 0
                currentSelected.value = []
                alert(`Your completed buy ticket!!`)
              }
            }, (error) => {
              console.log(error)
              alert(`Something went wrong: `, error.message)
            })
          }

        } else {
          alert('Please enter your name before buy ticket!')
        }
      }
    }

    return { 
      tickets, 
      selected, 
      currentSelected, 
      selectTicket, 
      classSelected, 
      disabled,
      buyTicketValidation,
      totalAmount
    }
  }
};
</script>