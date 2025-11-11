// Quick test script to verify dynamic dates are working
const now = new Date();
console.log('Current date:', now.toISOString());
console.log('Today in YYYY-MM-DD:', now.toISOString().split('T')[0]);

// Test data similar to our mock data
const interactions = [
  { id: 1, follow_up: "2024-04-15T10:00:00Z", followup_status: "pending" },
  { id: 2, follow_up: "2024-04-02T09:00:00Z", followup_status: "pending" },
  { id: 3, follow_up: "2024-04-05T14:00:00Z", followup_status: "pending" },
  { id: 4, follow_up: null, followup_status: "completed" },
  { id: 5, follow_up: "2024-06-22T10:30:00Z", followup_status: "pending" },
];

// Simulate the dynamic date function
function generateDynamicFollowUpDates(interactions) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const dateRanges = [
    { days: -14, category: 'overdue' },
    { days: -7, category: 'overdue' },
    { days: -3, category: 'overdue' },
    { days: -1, category: 'overdue' },
    { days: 0, category: 'today' },
    { days: 0, category: 'today' },
    { days: 1, category: 'upcoming' },
    { days: 2, category: 'upcoming' },
    { days: 3, category: 'upcoming' },
    { days: 5, category: 'upcoming' },
    { days: 7, category: 'upcoming' }
  ];
  
  return interactions.map((interaction) => {
    if (!interaction.follow_up || interaction.followup_status === 'completed') {
      return interaction;
    }
    
    const dateIndex = (interaction.id - 1) % dateRanges.length;
    const targetRange = dateRanges[dateIndex];
    
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + targetRange.days);
    
    const hour = 9 + (interaction.id % 8);
    const minute = (interaction.id * 15) % 60;
    newDate.setHours(hour, minute, 0, 0);
    
    return {
      ...interaction,
      follow_up: newDate.toISOString(),
      category: targetRange.category
    };
  });
}

const updatedInteractions = generateDynamicFollowUpDates(interactions);

console.log('\nOriginal vs Updated follow-up dates:');
interactions.forEach((original, index) => {
  const updated = updatedInteractions[index];
  console.log(`ID ${original.id}:`);
  console.log(`  Original: ${original.follow_up}`);
  console.log(`  Updated:  ${updated.follow_up}`);
  console.log(`  Category: ${updated.category || 'none'}`);
  console.log('');
});