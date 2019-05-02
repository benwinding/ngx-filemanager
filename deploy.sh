case "$1" in
  core)
      yarn core-build && pushd dist/ngx-filemanager-core && npm publish
      popd
      ;;
  client)
      yarn client-build && pushd dist/ngx-filemanager-client && npm publish
      popd
      ;;
  api)
      yarn api-build && pushd dist/ngx-filemanager-api && npm publish
      popd
      ;;
  *)
      echo $"Usage: $0 {start|stop|restart|condrestart|status}"
      exit 1
 esac
