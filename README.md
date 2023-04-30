# comb
an application for combing through prompt, target instruction data for fine-tuning LLMs

if you already have prompt and target pairs scraped/gathered, but they need to be edited, formatted, and such, this is the right tool for you.

![comb demo screenshot]((https://raw.githubusercontent.com/spencerhhubert/comb/main/assets/demo.png)

## how to use
although this is a server application, it's really only meant to be run locally for quickly iterating over your own data.

you'll need two folders in `/data`, `/data/raw` and `/data/out`. `out` can be empty. `raw` will contain `.JSON` files, each with a single prompt, target (the keys "prompt and "target" need to exist) inside them.

the program will iterate over those files, and write the edited versions to `/data/out` with the same file names.

```
chmod +x utils/docker/*
./utils/docker/build.sh
./utils/docker/run.sh
```

and go to `http://localhost:3000/`
