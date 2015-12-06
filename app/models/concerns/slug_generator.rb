class SlugGenerator
  # https://gist.github.com/lpar/1031933

  # These are the koremutake syllables, plus the most common 2 and 3 letter
  # syllables taken from the most common 5,000 words in English, minus a few
  # syllables removed so that combinations cannot generate common rude
  # words in English.
  SYLLABLES = %w(ba be bi bo bu by da de di do du dy fe fi fo fu fy ga ge gi
    go gu gy ha he hi ho hu hy ja je ji jo ju jy ka ke ko ku ky la le li lo
    lu ly ma me mi mo mu my na ne ni no nu ny pa pe pi po pu py ra re ri ro
    ru ry sa se si so su sy ta te ti to tu ty va ve vi vo vu vy bra bre bri
    bro bru bry dra dre dri dro dru dry fra fre fri fro fru fry gra gre gri
    gro gru gry pra pre pri pro pru pry sta ste sti sto stu sty tra tre er
    ed in ex al en an ad or at ca ap el ci an et it ob of af au cy im op co
    up ing con ter com per ble der cal man est for mer col ful get low son
    tle day pen pre ten tor ver ber can ple fer gen den mag sub sur men min
    out tal but cit cle cov dif ern eve hap ket nal sup ted tem tin tro tro)

  def self.generate(length)
    # srand # cost significative operation
    result = ''
    while result.length < length
      syl = SYLLABLES[rand(SYLLABLES.length)]
      result += syl
    end
    return result[0,length]
  end
end

# SlugGenerator.generate(8)