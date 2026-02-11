// Quick script to check if chat tables exist in Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking if chat tables exist...\n');
  
  const tables = ['conversations', 'conversation_members', 'messages'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      
      if (error) {
        console.error(`❌ Table "${table}" does NOT exist or has error:`, error.message);
      } else {
        console.log(`✅ Table "${table}" exists! Rows: ${data?.length || 0}`);
      }
    } catch (e) {
      console.error(`❌ Table "${table}" check failed:`, e.message);
    }
  }
  
  console.log('\n⚠️ If tables don\'t exist, you MUST run the SQL script from:');
  console.log('   supabase/migrations/20250210_modern_chat_setup.sql');
  console.log('   in your Supabase Dashboard → SQL Editor');
}

checkTables();
