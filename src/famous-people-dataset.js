/**
 * VedAstro 15,000 Famous People Dataset Utility
 * Standalone side module for optional research, chart matching, and benchmarking.
 * Source: https://huggingface.co/datasets/vedastro-org/15000-Famous-People-Birth-Date-Location
 */

export const FAMOUS_PEOPLE_SAMPLE = [
  { name: 'Albert Einstein', gender: 'Male', day: 14, month: 3, year: 1879, hr: 11, mn: 30, ampm: 'AM', place: 'Ulm' },
  { name: 'Nikola Tesla', gender: 'Male', day: 10, month: 7, year: 1856, hr: 12, mn: 0, ampm: 'AM', place: 'Smiljan' },
  { name: 'Steve Jobs', gender: 'Male', day: 24, month: 2, year: 1955, hr: 7, mn: 15, ampm: 'PM', place: 'San Francisco' },
  { name: 'APJ Abdul Kalam', gender: 'Male', day: 15, month: 10, year: 1931, hr: 1, mn: 15, ampm: 'AM', place: 'Rameswaram' },
  { name: 'Rabindranath Tagore', gender: 'Male', day: 7, month: 5, year: 1861, hr: 4, mn: 0, ampm: 'AM', place: 'Kolkata' },
  { name: 'Swami Vivekananda', gender: 'Male', day: 12, month: 1, year: 1863, hr: 6, mn: 33, ampm: 'AM', place: 'Kolkata' },
  { name: 'Shah Rukh Khan', gender: 'Male', day: 2, month: 11, year: 1965, hr: 2, mn: 30, ampm: 'AM', place: 'New Delhi' },
  { name: 'Marie Curie', gender: 'Female', day: 7, month: 11, year: 1867, hr: 12, mn: 0, ampm: 'PM', place: 'Warsaw' },
  { name: 'Leonardo da Vinci', gender: 'Male', day: 15, month: 4, year: 1452, hr: 10, mn: 30, ampm: 'PM', place: 'Anchiano' }
];

export async function fetchVedAstroDatasetChunk(offset = 0, limit = 100) {
  try {
    const response = await fetch(
      `https://datasets-server.huggingface.co/rows?dataset=vedastro-org%2F15000-Famous-People-Birth-Date-Location&config=default&split=train&offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error(`HuggingFace API HTTP error: ${response.status}`);
    const data = await response.json();
    return data.rows.map(r => r.row);
  } catch (err) {
    console.warn('VedAstro HuggingFace side module fallback to sample data:', err);
    return FAMOUS_PEOPLE_SAMPLE;
  }
}
