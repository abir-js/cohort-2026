## Code

```js

title Fitness Influencer Coaching Platform


User[color: green] {
  user_id int pk
  first_name varchar(50) not null
  last_name varchar(50) not null
  email varchar unique not null
  phone varchar(15)
  password varchar(255)
  user_role enum['trainer', 'client','admin']
  created_at timestamp
  updated_at timestamp
  }

  Trainers[color: Blue] {
  trainer_id int pk
  user_id fk unique
  specialties varchar
  max_client int
  experience int
  certification text
  is_available boolean
  created_at timestamp
  updated_at timestamp
  }

  Clients[color: red] {
  client_id int pk
  user_id fk unique
  trainer_id fk 
  date_of_birth date
  gender enum['male','female','other']
  height decimal
  weight decimal
  medical_conditions text
  created_at timestamp
  updated_at timestamp
  }

  Plans[color: Purple] {
  id int pk
  trainer_id fk
  plan_name varchar(30)
  duration_week int
  price decimal
  description string
  created_at timestamp
  updated_at timestamp
  }
  
  Subscriptions [color: orange] {
  subscription_id int pk
  client_id fk
  plan_id fk
  status enum['active', 'expired', 'cancelled'] not null
  plan_start datetime not null
  plan_end datetime not null
  is_active boolean
  created_at timestamp
  updated_at timestamp
  }

  Payment[color: Purple] {
    payment_id int pk
    suscription_id fk
    amount decimal(10,2) not null
    payment_method enum['card','upi','netbanking']
    payment_status enum['succeeded', 'failed', 'refunded'] 
    created_at timestamp
    updated_at timestamp
  }

  Sessions [color: black] {
  session_id int pk
  client_id fk
  trainer_id fk
  session_date datetime NOT NULL
  durations int
  created_at timestamp
  updated_at timestamp
  }

CheckIn[color: green] {
  checkIn_id int pk
  client_id int fk
  session_id fk
  checkIn_date datetime
  workout_type enum
  calories_burned int
  created_at timestamp
  updated_at timestamp
}

  Progress_tracking[color: red] {
  progress_id int PK
  client_id FK
  weight decimal
  body_fat decimal
  muscle_mass decimal
  notes text
  weekly_checkIn boolean
  created_at timestamp
  updated_at timestamp
  }

User.user_id  > Trainers.user_id
User.user_id  > Clients.user_id

Trainers.trainer_id  > Clients.trainer_id
Trainers.trainer_id  > Plans.trainer_id
Trainers.trainer_id  > Sessions.trainer_id

Clients.client_id > Sessions.client_id
Clients.client_id  > Subscriptions.client_id
Clients.client_id > CheckIn.client_id
Clients.client_id  > Progress_tracking.client_id

Plans.plan_id  > Subscriptions.plan_id
Subscriptions.subscription_id >Payment.suscription_id
```
