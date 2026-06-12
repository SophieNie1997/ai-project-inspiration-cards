import { execFileSync } from 'node:child_process'

run('npm', ['run', 'sync:cards'])
run('npm', ['test'])
run('npm', ['run', 'lint'])
run('npm', ['run', 'build'])

const publishPaths = ['imports/cards.csv', 'public/cards.json', 'public/images/cards']

const changedData = git(['status', '--short', '--', ...publishPaths]).trim()
if (!changedData) {
  console.log('No card data changes to publish.')
  process.exit(0)
}

run('git', ['add', ...publishPaths])
run('git', ['commit', '-m', 'chore: publish card data'])
run('git', ['push', 'origin', 'main'])

function run(command, args) {
  execFileSync(command, args, { stdio: 'inherit' })
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' })
}
