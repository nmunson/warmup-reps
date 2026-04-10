# WarmupReps

This application is a warmup sets and reps calculator for various
strength training programs.  You choose your working weight for each 
exercise in the program and the warmup sets and reps are automatically
calculated, along with the weights you need to place on the bar.  As 
you use it, it remembers preferences such as bar size, unit system, 
and the weights for each exercise when you come back for the next 
workout.  

## Programs

Programs are defined in JSON and placed in the programs folder.  An 
example program:

    {
      "title" : "My Program",
      "exercises" : [{
        "name" : "Squats",
        "max" : 500,
        "workouts" : [{
            "sets" : "2",
            "reps" : "5",
            "multiplier" : 0.5
          }, {
            "sets" : "1",
            "reps" : "5",
            "multiplier" : 1.0
          }
        ]
      }]
    }

Each exercise is defined with a name, a max weight, and an array of
workouts that include sets, reps, and the multiplier for the working
weight. For a more complete example, view `starting_strength.json` in the
`programs` folder. The Next.js app loads these files through
`src/lib/programs.js`.

## Development

Install dependencies with `npm install`, then run `npm run dev` for local
development. Production builds use the standard Next.js server output via
`npm run build`.

## Deploying to Vercel

This app is now configured as a standard Next.js application for Vercel,
not a static export. To publish it on Vercel:

1. Import the GitHub repository into Vercel.
2. Keep the default framework preset as `Next.js`.
3. Use the default build command `npm run build`.
4. No custom output directory is needed.

Vercel Analytics is enabled in the root layout using
`@vercel/analytics/next`.

## Contribute

* Fork the project.
* Make your feature addition or bug fix.
* Commit.
* Send me a pull request.

New programs are welcome in pull requests. Add the JSON file to the
`programs` folder, then register its filename in `src/lib/programs.js`.
The app will generate the corresponding program and exercise routes from
that data.

## License

[GPLv3](http://www.gnu.org/licenses/gpl-3.0.html)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see: http://www.gnu.org/licenses/
