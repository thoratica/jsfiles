console.log('%c엔1트리 글 백업%c백업을 시작합니다...', 'background-color: #45ed89; padding: .3rem; font-weight: 600; font-family: \'NanumSquare\'; font-size: 1.3rem; border-radius: 3rem; padding: 0 1.5rem;', 'font-family: \'NanumSquare\'; font-size: 1.3rem; margin-left: 1rem;')
const postId = (await (await (await fetch(`/api/discuss/find?username=${user.username}&title=&sort=created&rows=0&page=1&noCache=${Date.now()}`)).json()).data).map(post => post._id)
const postList = []
for (let pj of postId) {
  let { category, created, title, content, images } = await (await fetch(`/api/discuss/${pj}`)).json()
  postList.push({ category, created, title, content, images })
}

let category = postList.map(tmp => tmp.category)
let created = postList.map(tmp => tmp.created)
let title = postList.map(tmp => tmp.title)
let content = postList.map(tmp => tmp.content)
let images = postList.map(tmp => tmp.images)

let tmp = []

for (let i = 0; i < category.length; i++) {
  tmp.push(`------------------------------\n카테고리| ${category[i]}\n등록일| ${created[i]}\n제목| ${title[i]}\n내용| ${content[i]}\n------------------------------`)
}
console.log('%c엔1트리 글 백업%c백업이 완료되었습니다!', 'background-color: #45ed89; padding: .3rem; font-weight: 600; font-family: \'NanumSquare\'; font-size: 1.3rem; border-radius: 3rem; padding: 0 1.5rem;', 'font-family: \'NanumSquare\'; font-size: 1.3rem; margin-left: 1rem;')

  ; ((blob, name) => {
    const blobUrl = URL.createObjectURL(new Blob([blob]))
    const link = document.createElement("a")

    link.href = blobUrl
    link.download = name
    document.body.appendChild(link)
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    )
    document.body.removeChild(link)
  })(tmp.join('\n'), 'backup.txt')
console.log('%c엔1트리 글 백업%c백업이 다운로드됩니다...', 'background-color: #45ed89; padding: .3rem; font-weight: 600; font-family: \'NanumSquare\'; font-size: 1.3rem; border-radius: 3rem; padding: 0 1.5rem;', 'font-family: \'NanumSquare\'; font-size: 1.3rem; margin-left: 1rem;')
