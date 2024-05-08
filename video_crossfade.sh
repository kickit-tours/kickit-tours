#!/bin/bash

INPUT="$1"
CMD="ffmpeg"
SIZE=$(find . -iname "$INPUT" | wc -l)

if (( SIZE < 2 ))
then
  echo "2 or more videos are required"
  exit 1
fi

VIDEO=""
OUT=""

i="0"
total_duration="0"
for file in $(find . -iname "$INPUT" | sort)
do
  echo $file
  CMD="$CMD -i $file"

  duration=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$file" | cut -d'.' -f1)

  if [[ "$i" == "0" ]]
  then
    VIDEO="[0:v]setpts=PTS-STARTPTS[v0];"
  else
    fade_start=$((total_duration-$i))
    VIDEO="${VIDEO}[${i}:v]format=yuva420p,fade=in:st=0:d=1:alpha=1,setpts=PTS-STARTPTS+(${fade_start}/TB)[v${i}];"
    if (( i < SIZE-1 ))
    then
      if (( i == 1 ))
      then
        OUT="${OUT}[v0][v1]overlay[outv1];"
      else
        OUT="${OUT}[outv$((i-1))][v${i}]overlay[outv${i}];"
      fi
    else
      if (( SIZE == 2 ))
      then
        OUT="${OUT}[v0][v1]overlay,format=yuv420p[outv]"
      else
        OUT="${OUT}[outv$((i-1))][v${i}]overlay,format=yuv420p[outv]"
      fi
    fi
  fi

  total_duration=$((total_duration+duration))

  i=$((i+1))
done

CMD="$CMD -filter_complex \"${VIDEO}${OUT}\" -c:v libx264 -map [outv] crossfade.MP4"

echo "$CMD"

bash -c "$CMD"
