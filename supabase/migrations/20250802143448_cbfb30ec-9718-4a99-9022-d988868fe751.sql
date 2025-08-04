-- Create cards table
CREATE TABLE public.cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  value TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'text-foreground',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  color TEXT NOT NULL DEFAULT 'bg-orange-500',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer TEXT NOT NULL,
  issue TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Open', 'In Progress', 'Resolved')) DEFAULT 'Open',
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Low',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allowing public access for now)
CREATE POLICY "Allow public read access on cards" 
ON public.cards FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on cards" 
ON public.cards FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on services" 
ON public.services FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on services" 
ON public.services FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on tickets" 
ON public.tickets FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on tickets" 
ON public.tickets FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on tickets" 
ON public.tickets FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on tickets" 
ON public.tickets FOR DELETE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON public.cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.cards (title, value, subtitle, color) VALUES
  ('Total Clients', '120', 'New Prospects', 'text-foreground'),
  ('Total Projects', '450', 'Active Projects', 'text-foreground'),
  ('Total Tickets', '2507', 'Open Tickets', 'text-foreground'),
  ('New Requests Received', 'SEO', 'Service Type', 'text-foreground');

INSERT INTO public.services (name, progress, color) VALUES
  ('Website Development', 85, 'bg-orange-500'),
  ('Mobile App', 65, 'bg-orange-500'),
  ('SEO Optimization', 40, 'bg-orange-500'),
  ('UI/UX Design', 90, 'bg-orange-500'),
  ('Digital Marketing', 75, 'bg-orange-500');

INSERT INTO public.tickets (customer, issue, status, priority, date) VALUES
  ('John Doe', 'Website loading slow', 'Open', 'High', '2024-01-20'),
  ('Jane Smith', 'Login not working', 'In Progress', 'Medium', '2024-01-19'),
  ('Bob Johnson', 'Email integration', 'Resolved', 'Low', '2024-01-18'),
  ('Alice Brown', 'Mobile responsive', 'Open', 'High', '2024-01-17'),
  ('Charlie Wilson', 'Payment gateway', 'In Progress', 'Medium', '2024-01-16');