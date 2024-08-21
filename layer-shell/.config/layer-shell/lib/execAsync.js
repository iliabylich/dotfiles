import Gio from "gi://Gio?version=2.0";

export default function execAsync(cmd) {
    const process = Gio.Subprocess.new(
        cmd,
        Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
    );

    return new Promise((resolve, reject) => {
        process.communicate_utf8_async(null, null, (_, res) => {
            const [, stdout, stderr] = process.communicate_utf8_finish(res);
            process.get_successful()
                ? resolve(stdout.trim())
                : reject(stderr.trim());
        });
    })
}
