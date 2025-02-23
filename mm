<!-- Modal for Image -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="imageModalLabel">Menu Image</h5>
                    <i type="button" class="close-modal-img" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </i>
                </div>
                <div class="modal-body p-0">
                    <img src="" id="modalImage" class="img-fluid" alt="Menu Image">
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Cart Icon -->
    <div id="cart-float" class="cart-float" style="display: none;">
        <i class="fas fa-shopping-cart" style="margin-left: 25%; margin-top: 30%;"></i>
    </div>

    <!-- Cart Popup -->
    <div id="cart-popup" class="cart-popup">
        <div class="popup-content">
            <span class="close close-cart-popup">&times;</span>
            <h2>Keranjang</h2>
            <ul id="cart-items" class="list-group"></ul>
            <button id="send-order-button" class="btn btn-success mt-3">Pesan Sekarang</button>
        </div>
    </div>

    <script src="js/scripts.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
        // Script to handle image click and show in modal
        document.addEventListener('DOMContentLoaded', function() {
            const imageModal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');

            $('#imageModal').on('show.bs.modal', function(event) {
                const button = $(event.relatedTarget); // Button that triggered the modal
                const imgSrc = button.attr('src'); // Extract info from data-* attributes
                modalImage.src = imgSrc;
            });

            $('#imageModal').on('hidden.bs.modal', function() {
                modalImage.src = '';
            });
        });
    </script>
</body>
</html>