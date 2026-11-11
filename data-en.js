// English version of the handbook data. Same structure as data.js.
// Prices are written as {{amount}} in US dollars; the page shows them in the chosen currency.
const EN = {
CITIES: {
  flight: {name: 'Flight', en: 'IN THE AIR'},
  philly: {name: 'Philadelphia', en: 'PHILADELPHIA'},
  nyc: {name: 'New York', en: 'NEW YORK'},
  rest: {name: 'Philadelphia', en: 'PHILADELPHIA'},
  dc: {name: 'Washington', en: 'WASHINGTON, D.C.'}
},
CHAPTERS: {
  philly: {title: 'Philadelphia', sub: 'Old City · Art Museum · South Philly'},
  nyc: {title: 'New York', sub: 'Midtown · museums · Statue of Liberty · Brooklyn'},
  rest: {title: 'Rest in Philadelphia', sub: 'Laundry · shopping'},
  dc: {title: 'Washington', sub: 'Capitol · museums · memorials'}
},
PENDING: [
  ['Apr 8 · China Airlines shuttle', 'After CI12 lands, the plan is the China Airlines shuttle to Philadelphia. Check with the airline that it still runs and how to reserve it.'],
  ['Stays', 'New York Apr 12–19 (seven nights) and Washington Apr 21–23 (two nights) are not booked yet. In Philadelphia we stay at Victoria\'s.'],
  ['Trains and tickets', 'Three Amtrak legs to book. Independence Hall, the Capitol tour, the Air and Space Museum and the Washington Monument each open on a set date; see the Tickets page.']
],
DAYS: [
['04-08', 'flight', 'Taipei → New York → Philadelphia', 'Depart Taipei Taoyuan TPE on China Airlines CI12 (departure time to be added)|20:40 Arrive New York JFK, Terminal 4|21:00 Immigration and baggage, about 1 to 1.5 hours|22:30 China Airlines shuttle to Philadelphia, about 2 to 2.5 hours|01:00 Arrive in Philadelphia; Victoria books a ride home', 'The shuttle must be reserved. Check the schedule and pick-up point again before leaving. Immigration will ask where you are staying and for how long, so keep Victoria\'s address and the return e-ticket on your phone.'],
['04-09', 'philly', 'Old City: Liberty Bell and Independence Hall', 'Morning Sleep in|11:30 Brunch|13:30 Liberty Bell Center, free|14:40 Independence Hall tour, timed ticket needed|15:30 Old City walk: Elfreth\'s Alley, Betsy Ross House from outside|17:00 Penn\'s Landing riverfront|18:30 Dinner', 'First day of jet lag: go home if you are tired in the afternoon. Independence Hall tours run every 20 minutes from 10:40 to 16:40. Book on recreation.gov, {{1}} fee per ticket, released 30 days ahead.'],
['04-10', 'philly', 'Market, City Hall, Philadelphia Museum of Art', '09:30 Breakfast at Reading Terminal Market (daily 8:00–18:00)|11:00 City Hall and LOVE Park|12:00 Walk the Benjamin Franklin Parkway to the museum, about 25 minutes|13:00 Philadelphia Museum of Art; the Rocky steps and statue are outside|16:30 Rittenhouse Square and shopping on Walnut Street|19:00 Dinner', 'The museum is open Saturday 10:00–17:00 and closed Tuesday and Wednesday. Admission price to be confirmed.'],
['04-11', 'philly', 'South Philly: Italian Market and cheesesteak', '10:00 Italian Market on 9th Street|11:30 Cheesesteak: Pat\'s and Geno\'s face each other, pick one|13:30 Philadelphia\'s Magic Gardens|14:30 South Street shops|16:00 Home to rest and pack for New York|19:00 Dinner', 'Magic Gardens tickets and hours to be confirmed. We take the train tomorrow, so pack for seven days only.'],
['04-12', 'nyc', 'To New York: Times Square and Midtown', '09:30 Amtrak from Philadelphia 30th Street Station|11:00 Arrive at Moynihan Train Hall (Penn Station)|11:30 Drop bags at the hotel|12:30 Lunch|14:00 Times Square|15:00 Bryant Park and the New York Public Library|16:00 Grand Central Terminal|17:00 Fifth Avenue, St. Patrick\'s Cathedral, Rockefeller Center|19:00 Top of the Rock; sunset is around 19:30|20:30 Dinner', 'Train to be booked; fares are cheaper early. Reserve the observation deck for an hour before sunset. New York hotel not booked yet.'],
['04-13', 'nyc', 'The Met and Central Park', '09:00 Bagel breakfast|10:00 The Metropolitan Museum of Art, allow at least three hours|13:30 Lunch|14:30 Central Park: Bethesda Terrace, Bow Bridge, Strawberry Fields|17:00 Columbus Circle and the Upper West Side|19:00 Dinner', 'The Met is open Tuesday 10:00–17:00 and closed Wednesday; adult admission is {{30}}. It is huge, so start with the Egyptian wing, European paintings and the roof garden (check that it is open).'],
['04-14', 'nyc', 'Statue of Liberty, Wall Street, 9/11 Memorial', '08:30 Statue City Cruises ferry from Battery Park|09:30 Liberty Island and the statue|11:30 Ellis Island immigration museum|13:30 Back in Manhattan, lunch|14:30 Wall Street, the Charging Bull, the Stock Exchange from outside|15:30 9/11 Memorial pools, free|16:00 9/11 Memorial Museum, timed ticket needed|18:00 The Oculus|19:00 Dinner in Chinatown', 'Statue City Cruises is the only official ferry; do not buy from street sellers at Battery Park. Pedestal and crown access are separate ticket types, and crown tickets often sell out months ahead. The 9/11 Museum is open Wednesday to Monday 9:00–19:00; tickets are {{24-36}}.'],
['04-15', 'nyc', 'Brooklyn Bridge and SoHo', '09:30 Subway to DUMBO; photo of the Manhattan Bridge from Washington Street|10:30 Brooklyn Bridge Park|11:30 Pizza for lunch: Juliana\'s or Grimaldi\'s|13:00 Walk the Brooklyn Bridge back to Manhattan, 30 to 40 minutes|14:30 Shopping in SoHo|17:00 Little Italy and Chinatown|19:00 Dinner', 'It is windy on the bridge, so bring a jacket. Most SoHo shops open after 11:00, which is why it is in the afternoon.'],
['04-16', 'nyc', 'MoMA, Chelsea Market, High Line', '10:30 Museum of Modern Art|13:30 Lunch|15:00 Chelsea Market|16:00 High Line, walking north|17:30 Hudson Yards and the Vessel from outside|19:00 Dinner in Koreatown', 'MoMA is open daily 10:30–17:30 and until 20:30 on Fridays; adult admission is {{30}}.'],
['04-17', 'nyc', 'Natural History Museum and Greenwich Village', '10:00 American Museum of Natural History|13:30 Lunch|15:00 Washington Square Park|15:45 Greenwich Village and Bleecker Street in the West Village|19:00 Dinner|Evening Empire State Building lit up, seen from outside', 'Museum prices and time slots to be confirmed. Saturdays are busy, so arrive early.'],
['04-18', 'nyc', 'Catch-up day', '10:00 Brunch|Morning Flatiron Building, Madison Square Park, Union Square|Afternoon More shopping, or anything missed earlier in the week|17:00 Fifth Avenue or Macy\'s|19:00 Dinner and packing', 'If it rained on an earlier day, move that day\'s outdoor plan here.'],
['04-19', 'rest', 'Back to Philadelphia', '11:00 Check out|12:00 Amtrak from Moynihan Train Hall|13:30 Arrive at Philadelphia 30th Street Station|Afternoon Laundry and rest|Evening Dinner at home', 'Train to be booked.'],
['04-20', 'rest', 'King of Prussia shopping, or a day at home', '10:30 Leave for King of Prussia Mall, 40 to 60 minutes|11:00 Shopping; lunch in the mall|17:00 Head home|Evening Pack for Washington', 'Pennsylvania charges no sales tax on clothing and shoes. If you would rather stay in, nothing today is a must.'],
['04-21', 'dc', 'To Washington: the Capitol', '09:00 Amtrak from Philadelphia 30th Street Station|11:00 Arrive at Washington Union Station|11:30 Drop bags at the hotel|12:00 Lunch|13:30 US Capitol tour, free|15:00 Library of Congress and the Supreme Court from outside|17:00 Check in|19:00 Dinner', 'Bring all luggage for the flight home today, because we go straight to the airport on the evening of April 23. Capitol tours open for booking 90 days ahead; the Visitor Center is open Monday to Saturday 8:30–16:30. Whether the Library of Congress needs a timed pass is to be confirmed. Washington hotel not booked yet.'],
['04-22', 'dc', 'Museums and the National Mall memorials', '10:00 National Air and Space Museum, free, timed pass needed|12:30 Lunch|14:00 National Museum of Natural History, or the National Gallery of Art|16:00 Washington Monument; tickets needed to go up|17:30 World War II Memorial and the Reflecting Pool|18:15 Vietnam Veterans Memorial|19:00 Lincoln Memorial at sunset, around 19:50|20:30 Dinner', 'The longest walking day: about 3 km from the Capitol to the Lincoln Memorial, so wear comfortable shoes. Air and Space passes are released two months ahead; Monument tickets 30 days ahead, with another batch at 10:00 the day before.'],
['04-23', 'dc', 'White House, Georgetown, airport at night', '09:30 White House from Lafayette Square|10:30 National Museum of African American History and Culture, or the American History Museum|13:00 Lunch|14:30 Georgetown: M Street shops and the waterfront|17:30 Dinner|19:00 Collect bags from the hotel|19:30 Metro Silver Line to Dulles Airport|21:00 Arrive at IAD: check in, bag drop, security', 'Leave the bags at the hotel after check-out. African American History Museum passes open 30 days ahead, with same-day passes online at 8:15. Silver Line travel time to be confirmed; allow over an hour, or take a car if there is a lot of luggage.'],
['04-24', 'flight', 'Washington → Taipei', '01:15 EVA Air BR3 departs Washington Dulles IAD', 'Departure is 01:15 on April 24 Eastern time, which means being at the airport late on April 23.'],
['04-25', 'flight', 'Back in Taiwan', '05:50 Arrive Taipei Taoyuan TPE (Taiwan time)', '']
],
FLIGHTS: [
  {date: '04-08', code: 'CI12', airline: 'China Airlines', from: 'TPE', fromName: 'Taipei Taoyuan', to: 'JFK', toName: 'New York JFK, Terminal 4', dep: 'time to be added', arr: '20:40', note: 'After landing, take the China Airlines shuttle to Philadelphia. Victoria books a ride home, arriving around 01:00 on April 9.'},
  {date: '04-24', code: 'BR3', airline: 'EVA Air', from: 'IAD', fromName: 'Washington Dulles', to: 'TPE', toName: 'Taipei Taoyuan', dep: '01:15', arr: 'Apr 25, 05:50', note: 'Leave central Washington on the evening of April 23 and be at the airport by 21:00. The arrival time is Taiwan time.'}
],
TRANSFERS: [
  ['Apr 8 · New York JFK → Philadelphia', 'After immigration and baggage, take the China Airlines shuttle, about 2 to 2.5 hours. Victoria books a ride home from the drop-off, arriving around 01:00.'],
  ['Apr 23 · Central Washington → Dulles Airport', 'Leave on the Metro Silver Line at 19:30 and be at the airport by 21:00. The flight is at 01:15 on April 24, so mind the date.']
],
TRANSPORT: [
  ['04-08', 'New York JFK → Philadelphia', 'JFK Terminal 4 → Philadelphia', 'Leaves around 22:30, 2 to 2.5 hours', 'To confirm', 'China Airlines shuttle; reservation required.'],
  ['04-12', 'Philadelphia → New York', 'Philadelphia 30th Street → Moynihan Train Hall', 'Planned 09:30 departure, about 1.5 hours', 'To book', 'Amtrak. To save money, take SEPTA to Trenton and change to NJ Transit, about 2.5 hours.'],
  ['04-19', 'New York → Philadelphia', 'Moynihan Train Hall → Philadelphia 30th Street', 'Planned 12:00 departure, about 1.5 hours', 'To book', 'Amtrak.'],
  ['04-21', 'Philadelphia → Washington', 'Philadelphia 30th Street → Washington Union Station', 'Planned 09:00 departure, about 2 hours', 'To book', 'Amtrak.'],
  ['04-23', 'Central Washington → Dulles Airport', 'Metro Silver Line → Washington Dulles International Airport station', 'Planned 19:30 departure', 'Pay on the day', 'One way {{2.25-6.75}}. The last train on Fridays is very late, so there is no rush.']
],
LOCAL: [
  ['New York subway and buses', '{{3}} a ride. No ticket needed: tap a contactless card or phone at the gate (OMNY). After a set number of paid rides in 7 days on the same card the rest are free; the cap is set by the MTA, so use one card throughout.'],
  ['Washington Metro', '{{2.25-6.75}} a ride depending on distance; tap in and out. Contactless cards and phones work.'],
  ['Philadelphia', 'SEPTA subways and buses also take contactless cards. Old City and Center City are walkable.'],
  ['Ride-hailing', 'Uber and Lyft work in all three cities. Use them late at night or with luggage.']
],
TICKETS: [
  ['Before the trip', 'ESTA travel authorization', 'esta.cbp.dhs.gov, {{40}}', 'To do', 'Taiwan passport holders travel visa-free but need an ESTA, submitted at least 72 hours before departure. Apply only on the official site; agency sites charge extra.'],
  ['04-08', 'China Airlines JFK → Philadelphia shuttle', 'Reserve with China Airlines', 'To confirm', 'Confirm that it runs for this CI12, the pick-up point and the Philadelphia drop-off.'],
  ['04-09', 'Independence Hall tour', 'recreation.gov, {{1}} per ticket', 'To book', 'Released 30 days ahead, so from March 10. From 9:00 to 10:30 entry is open without tickets.'],
  ['04-12', 'Top of the Rock', 'Timed ticket on the official site', 'To book', 'Book an hour before sunset. Summit One Vanderbilt or Edge are alternatives; one of the three is enough.'],
  ['04-13', 'The Met', 'Official site or at the door, adults {{30}}', 'To book', 'Closed Wednesdays.'],
  ['04-14', 'Statue of Liberty and Ellis Island ferry', 'Statue City Cruises official site', 'To book', 'Take the first or second sailing. Pedestal and crown access need the right ticket type, and crown tickets sell out early.'],
  ['04-14', '9/11 Memorial Museum', 'Timed ticket on the official site, {{24-36}}', 'To book', 'Mostly closed on Tuesdays, which is why it is on Wednesday.'],
  ['04-16', 'MoMA', 'Official site or at the door, adults {{30}}', 'To book', ''],
  ['04-21', 'US Capitol tour', 'visitthecapitol.gov, free', 'To book', 'Opens 90 days ahead, so from about January 21.'],
  ['04-22', 'National Air and Space Museum', 'Smithsonian site, free timed pass', 'To book', 'Opens two months ahead, so from about February 22.'],
  ['04-22', 'Washington Monument', 'recreation.gov', 'To book', 'Opens 30 days ahead, with another batch at 10:00 the day before.'],
  ['04-23', 'National Museum of African American History and Culture', 'Smithsonian site, free timed pass', 'To book', 'Opens 30 days ahead; same-day passes go online at 8:15.']
],
STAYS: [
  {city: 'Philadelphia', name: 'Victoria\'s home', start: '04-09', end: '04-12', nights: 3, status: 'Confirmed', note: 'Arriving in the early hours of April 9.'},
  {city: 'New York', name: 'Hotel to be booked', start: '04-12', end: '04-19', nights: 7, status: 'To book', note: 'Look in Midtown or Lower Manhattan, within a 5-minute walk of a subway station.'},
  {city: 'Philadelphia', name: 'Victoria\'s home', start: '04-19', end: '04-21', nights: 2, status: 'Confirmed', note: ''},
  {city: 'Washington', name: 'Hotel to be booked', start: '04-21', end: '04-23', nights: 2, status: 'To book', note: 'Look near the National Mall or a Metro station. It must be able to hold bags until the evening of April 23 after check-out.'}
],
NOTES: [
  ['Entering the US', ['Passport, ESTA approval and the return e-ticket.', 'Immigration will ask why you are visiting, where you are staying and for how long. Answer plainly: visiting a friend, staying at her home and in hotels, flying back on April 24.', 'Meat, fruit and eggs cannot be brought in. That includes instant noodles with meat pieces.']],
  ['Time and weather', ['US Eastern time is 12 hours behind Taiwan.', 'April days are about 15 to 20°C and mornings and nights 5 to 10°C, with some rain. Bring a windproof jacket, a light sweater and comfortable shoes.', 'Expect more than 10,000 steps a day in New York and Washington.']],
  ['Tips and tax', ['At sit-down restaurants, tip 18% to 20% of the pre-tax bill. Counter-service places are optional.', 'Listed prices exclude tax; it is added at the till.', 'Pennsylvania does not tax clothing and shoes. In New York, clothing and shoes under {{110}} per item are also exempt.']],
  ['Money and power', ['Cards work almost everywhere; {{100-200}} in cash is enough.', 'Power is 120V and the sockets match Taiwan\'s, so no adapter is needed.', 'Buy an eSIM or turn on roaming before leaving.']],
  ['Safety', ['Emergency number: 911.', 'Keep hold of your phone and bag on the subway, and take a car late at night.', 'In Times Square, people in costumes pose for photos and then ask for money. Ignore them.']],
  ['Luggage', ['New York and Washington are both by train, so you carry your own bags on and off. For the week in New York a small suitcase is enough; leave the rest in Philadelphia.', 'Take everything to Washington on April 21, because the flight home leaves from there.']]
]
};
