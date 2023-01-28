const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASEURL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// supabase.from("sunData2").select("*").then(console.log).catch(console.error);

const main = async () => {
  let { data, error } = await supabase.from("sunData2").select("*").limit(5);

  if (error) {
    console.log(error);
    return;
  }
  const sunrise = data[0].sunrise;
  const sunset = data[0].sunset;
  console.log("sunrise", sunrise);
  console.log("sunset", sunset);
};
main();
