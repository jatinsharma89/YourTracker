const workoutData = [
    {
        week: 1,
        days: [
            { name: "Monday", focus: "Chest & Back (Mass)", exercises: [
                { name: "Barbell Bench Press", sets: 4, reps: 8, info: "Keep shoulders retracted." },
                { name: "Bent Over Rows", sets: 4, reps: 8, info: "Pull to your lower belly." },
                { name: "Incline DB Press", sets: 3, reps: 12, info: "Focus on upper chest." },
                { name: "Lat Pulldowns", sets: 3, reps: 12, info: "Wide grip for back width." },
                { name: "Cable Rows", sets: 3, reps: 15, info: "Squeeze shoulder blades." },
                { name: "Pushups", sets: 3, reps: "Fail", info: "Maintain straight body." }
            ]},
            { name: "Tuesday", focus: "Legs (Power)", exercises: [
                { name: "Barbell Squats", sets: 4, reps: 8, info: "Sit back into the squat." },
                { name: "Leg Press", sets: 4, reps: 12, info: "Do not lock knees." },
                { name: "Leg Extensions", sets: 3, reps: 15, info: "Squeeze quads at top." },
                { name: "Lunges", sets: 3, reps: "10/leg", info: "Control your descent." },
                { name: "Calf Raises", sets: 4, reps: 15, info: "Full range of motion." }
            ]},
            { name: "Wednesday", focus: "Shoulders & Core", exercises: [
                { name: "Overhead Press", sets: 4, reps: 8, info: "Core tight, press straight." },
                { name: "Lateral Raises", sets: 4, reps: 15, info: "Pinkies slightly up." },
                { name: "Face Pulls", sets: 3, reps: 15, info: "Pull rope towards eyes." },
                { name: "Dumbbell Shrugs", sets: 3, reps: 12, info: "Squeeze traps at top." },
                { name: "Hanging Leg Raises", sets: 3, reps: 15, info: "Control the swing." }
            ]},
            { name: "Friday", focus: "Deadlift & Hamstrings", exercises: [
                { name: "Conventional Deadlift", sets: 3, reps: 5, info: "Bar stays against shins." },
                { name: "Romanian Deadlift", sets: 3, reps: 10, info: "Feel hamstring stretch." },
                { name: "Leg Curls", sets: 3, reps: 12, info: "Control the weight down." },
                { name: "Pull Ups", sets: 3, reps: "Fail", info: "Chest to the bar." },
                { name: "Back Extensions", sets: 3, reps: 15, info: "Engage your glutes." }
            ]},
            { name: "Saturday", focus: "Arms & Aesthetics", exercises: [
                { name: "Weighted Dips", sets: 3, reps: 10, info: "Elbows tucked for triceps." },
                { name: "Barbell Bicep Curls", sets: 3, reps: 10, info: "No swinging allowed." },
                { name: "Skull Crushers", sets: 3, reps: 12, info: "Lower to your forehead." },
                { name: "Hammer Curls", sets: 3, reps: 12, info: "Builds forearm thickness." },
                { name: "Tricep Pushdowns", sets: 3, reps: 15, info: "Lock elbows to side." }
            ]}
        ]
    }
];