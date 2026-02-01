# 生成音效的 FFmpeg 命令

## 1. 生成简单的蜂鸣声
```bash
ffmpeg -f lavfi -i "sine=frequency=1000:duration=0.5" beep.wav
```

## 2. 生成扫描音效（频率变化）
```bash
ffmpeg -f lavfi -i "sine=frequency=200:duration=2" \
  -af "volume=0.3" scan.wav
```

## 3. 生成白噪音
```bash
ffmpeg -f lavfi -i "color=c=black:s=1920x1080:d=2" \
  -f lavfi -i "anoisesrc=duration=2" noise.wav
```

## 4. 合成多个音效
```bash
# 生成基础音效
ffmpeg -f lavfi -i "sine=frequency=440:duration=0.2" tone1.wav
ffmpeg -f lavfi -i "sine=frequency=880:duration=0.3" tone2.wav

# 合并
ffmpeg -i tone1.wav -i tone2.wav -filter_complex amix=inputs=2:duration=first:dropout_transition=0 combined.wav
```

## 5. 添加淡入淡出
```bash
ffmpeg -i input.wav -af "afade=t=in:st=0:d=0.1,afade=t=out:st=0.4:d=0.1" output.wav
```

## 为运动相机视频生成音效序列

### 场景1: 产品亮相 - 深沉揭示音
```bash
ffmpeg -f lavfi -i "sine=frequency=150:duration=1" \
  -af "afade=t=in:st=0:d=0.3,afade=t=out:st=0.7:d=0.3" scene1_reveal.wav
```

### 场景2-7: 转场音效 - 高频提示音
```bash
ffmpeg -f lavfi -i "sine=frequency=880:duration=0.15" \
  -af "volume=0.2" transition_beep.wav
```

### 场景8: 结尾 - 收束音效
```bash
ffmpeg -f lavfi -i "sine=frequency=440:duration=0.5" \
  -af "afade=t=out:st=0.3:d=0.2" scene8_end.wav
```

## 完整音频序列合成

将所有场景音效合并为一个音频文件：
```bash
# 生成所有场景音效
# (先运行上面的各个命令)

# 合并为完整音轨（使用 silent 填充空白）
ffmpeg -f lavfi -i "anullsrc=r=44100:cl=stereo" -t 40 \
  -i scene1_reveal.wav \
  -i transition_beep.wav \
  -i scene8_end.wav \
  -filter_complex "\
    [0:a][1:a]alooverlay=enable='between(t,0,5)':eval=init[sa1];\
    [sa1][2:a]alooverlay=enable='between(t,5,39)':w=120[sa2];\
    [sa2][3:a]alooverlay=enable='between(t,39,40)'[saout]\
  " \
  -map "[saout]" complete_audio.wav
```
