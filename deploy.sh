case "$1" in
  core)
      yarn core-build && pushd dist/ngx-filemanager-core && npm publish
      popd
      ;;
  client)
      yarn client-build && pushd dist/ngx-filemanager-client-firebase && npm publish
      popd
      ;;
  api)
      yarn api-firebase-build && pushd dist/ngx-filemanager-api-firebase && npm publish
      popd
      ;;
  *)
      echo $"Usage: $0 {start|stop|restart|condrestart|status}"
      exit 1
 esac
