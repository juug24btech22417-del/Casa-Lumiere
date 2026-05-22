# Supabase Database Schema

## Extensions
- postgis: Required for storing and querying land plot polygons.

## Tables

### 1. plots
Stores the spatial and technical data for each piece of land.
- `id`: UUID (PK)
- `plot_number`: VARCHAR (Unique) - e.g., "B-12"
- `status`: VARCHAR ('available', 'developing', 'sold')
- `area_sqft`: DECIMAL
- `price`: DECIMAL(12, 2)
- `description`: TEXT
- `geometry`: GEOMETRY(Polygon, 4326) - The Mapbox polygon coordinates
- `panorama_url`: TEXT - Link to 360° viewer asset
- `amenities`: JSONB - e.g., {"water": true, "road": "paved"}
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

### 2. leads
Stores qualified leads from the AI Land Assistant.
- `id`: UUID (PK)
- `full_name`: VARCHAR
- `phone_number`: VARCHAR (Unique)
- `email`: VARCHAR
- `qualification_score`: INT - Assigned by Claude AI
- `ai_summary`: TEXT - Analysis of the user's needs
- `status`: VARCHAR ('new', 'qualified', 'contacted', 'converted')
- `created_at`: TIMESTAMPTZ

### 3. bookings
Manages site visits and consultation calls.
- `id`: UUID (PK)
- `plot_id`: UUID (FK -> plots.id)
- `lead_id`: UUID (FK -> leads.id)
- `visit_date`: TIMESTAMPTZ
- `status`: VARCHAR ('scheduled', 'completed', 'cancelled')
- `whatsapp_notified`: BOOLEAN
- `created_at`: TIMESTAMPTZ

### 4. chat_sessions
Persists conversations for the AI Assistant.
- `id`: UUID (PK)
- `lead_id`: UUID (FK -> leads.id)
- `messages`: JSONB - Array of {role, content}
- `last_active`: TIMESTAMPTZ
