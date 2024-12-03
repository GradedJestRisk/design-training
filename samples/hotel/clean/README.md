## Setup

Install: `npm ci` 

Start database local server : `docker compose up --detach --wait`

Create schema: `npm run database:migrations:apply`

## Tests

### Automated
Run automated tests: `npm run test`

### Manual

#### Create data 
Use seeds: `npm run database:seed`

Add them manually: 
- `psql postgresql://service-user@localhost/`
- `INSERT INTO rooms(number, floor, price) VALUES(1, 0, 50);`;

#### Run

CLI: 
- `npm run start:cli`
Web:
- `npm run start:web`
- `curl localhost:3000/rooms | jq -r`

