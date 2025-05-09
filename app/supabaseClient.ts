import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gktaashanghdnaqzoexf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdGFhc2hhbmdoZG5hcXpvZXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzg2MjgsImV4cCI6MjA2MTYxNDYyOH0.v74vgXUrFRVTYQHwlkRArNkshaxZ1p458qJNHNH4BGI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
